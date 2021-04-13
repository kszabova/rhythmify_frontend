import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {

  @Input() data: any;
  @Input() chartTitle: string;
  @Input() valueXName: string;
  @Input() valueYName: string;

  private width = 700;
  private height = 500;
  private margin = {
    top: 30,
    bottom: 50,
    left: 50,
    right: 10
  };

  private svg;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot(this.data);
  }

  createSvg(): void {
    this.svg = d3.select("figure#scatter")
                 .append("svg")
                 .attr("width", this.width)
                 .attr("height", this.height);
  }

  drawPlot(data: any): void {
    // create scales
    var minX = Math.min(d3.min(data, (d: any) => d.x as number));
    var maxX = Math.max(d3.max(data, (d: any) => d.x as number));
    var x = d3.scaleLinear()
              .domain([Math.min(0, minX), maxX])
              .range([this.margin.left, this.width - this.margin.right]);

    var minY = Math.min(d3.min(data, (d: any) => d.y as number));
    var maxY = Math.max(d3.max(data, (d: any) => d.y as number));
    var y = d3.scaleLinear()
              .domain([Math.min(0, minY), maxY])
              .range([this.height - this.margin.bottom, this.margin.top]);

    // draw the data
    this.svg.append("g")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("fill", "none")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 3);

    // draw axes
    var xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x).ticks(this.width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", this.width)
                .attr("y", this.margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text(data.x))

    var yAxis = g => g
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -this.margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(data.y))
        
    this.svg.append("g").call(xAxis);
    this.svg.append("g").call(yAxis);

    // add title
    this.svg.append("text")
            .attr("x", (this.width / 2))             
            .attr("y", this.margin.top / 2)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text(this.chartTitle);

    // axis labels
    this.svg.append("text")             
            .attr("transform",
                  "translate(" + (this.width/2) + " ," + 
                                (this.height - this.margin.bottom + 30) + ")")
            .style("text-anchor", "middle")
            .text(this.valueXName);

    this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", this.margin.left - 45)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(this.valueYName);   

  }

}
