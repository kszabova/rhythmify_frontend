import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

  @Input() data: any;
  @Input() chartTitle: string;

  private svg;
  private margin = 50;
  private width = 750 - 2 * this.margin;
  private height = 400 - 2 * this.margin;
  private color = "red";

  constructor() { }

  ngOnInit(): void {
    console.log("histogram " + this.chartTitle);
    this.createSvg();
    this.drawHist(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#hist")
                 .append("svg")
                 .attr("width", this.width + (this.margin * 2))
                 .attr("height", this.height + (this.margin * 2))
                 .append("g")
                 .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawHist(data: any): void {
    // create data bins
    const bins = d3.bin().thresholds(100)(data)

    // create scales
    const xScale = d3.scaleLinear()
                     .domain([bins[0].x0, bins[bins.length - 1].x1])
                     .range([this.margin, this.width - this.margin]);
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(bins, d => d.length)]).nice()
                     .range([this.height - this.margin, this.margin]);

    // create axes
    const xAxis = g => g
                     .attr("transform", `translate(0,${this.height - this.margin + 10})`)
                     .call(d3.axisBottom(xScale).ticks(this.width / 40 ).tickSizeOuter(0))
                     .call(g => g.append("text")
                         .attr("x", this.width - this.margin)
                         .attr("y", -4)
                         .attr("fill", "currentColor")
                         .attr("font-weight", "bold")
                         .attr("text-anchor", "end")
                         .text(data.x))

    const yAxis = g => g
                      .attr("transform", `translate(${this.margin - 10},0)`)
                      .call(d3.axisLeft(yScale).ticks(this.height / 20))
                      .call(g => g.select(".domain").remove())
                      .call(g => g.select(".tick:last-of-type text").clone()
                          .attr("x", 4)
                          .attr("text-anchor", "start")
                          .attr("font-weight", "bold")
                          .text(data.y))

    // draw the rectangles for each data
    this.svg.append("g")
            .attr("fill", this.color)
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => xScale(d.x0) + 1)
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", d => yScale(d.length))
            .attr("height", d => yScale(0) - yScale(d.length));
    
    // draw the axes
    this.svg.append("g").call(xAxis);
    this.svg.append("g").call(yAxis);

    // add title
    this.svg.append("text")
            .attr("x", (this.width / 2))             
            .attr("y", this.margin / 2)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(this.chartTitle);
  }
}
