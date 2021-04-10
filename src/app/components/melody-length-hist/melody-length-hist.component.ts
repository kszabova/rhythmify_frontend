import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-melody-length-hist',
  templateUrl: './melody-length-hist.component.html',
  styleUrls: ['./melody-length-hist.component.css']
})
export class MelodyLengthHistComponent implements OnInit {

  data: any;
  private svg;
  private margin = 50;
  private width = 750 - 2 * this.margin;
  private height = 400 - 2 * this.margin;
  private color = "red";

  constructor(
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    this.chantService.getAll().subscribe(
      (data: any) => {
        this.data = data.map(
          chant => chant.volpiano.split("---").length
        );
        this.createSvg();
        this.drawHist(this.data);
      }
    )
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
    const bins = d3.bin().thresholds(100)(data)
    const xScale = d3.scaleLinear()
                     .domain([bins[0].x0, bins[bins.length - 1].x1])
                     .range([this.margin, this.width - this.margin]);
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(bins, d => d.length)]).nice()
                     .range([this.height - this.margin, this.margin]);

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

    this.svg.append("g")
            .attr("fill", this.color)
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => xScale(d.x0) + 1)
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", d => yScale(d.length))
            .attr("height", d => yScale(0) - yScale(d.length));
    
    this.svg.append("g").call(xAxis);
    this.svg.append("g").call(yAxis);
  }

}
