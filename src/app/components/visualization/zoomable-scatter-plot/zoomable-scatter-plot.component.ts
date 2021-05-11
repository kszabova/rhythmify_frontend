import { Component, Input, OnInit } from '@angular/core';
import { IScatterData } from 'src/app/interfaces/scatter-data.interface';

import * as d3 from 'd3';

@Component({
  selector: 'app-zoomable-scatter-plot',
  templateUrl: './zoomable-scatter-plot.component.html',
  styleUrls: ['./zoomable-scatter-plot.component.css']
})
export class ZoomableScatterPlotComponent implements OnInit {

  @Input() data: IScatterData[];
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
    this.svg = d3.select("figure#zoomable-scatter")
                 .append("svg")
                 .attr("width", this.width)
                 .attr("height", this.height);
  }

  drawPlot(data: IScatterData[]): any {
    // create scales
    let minX = Math.min(d3.min(data, d => d.x));
    let maxX = Math.max(d3.max(data, d => d.x));
    let x = d3.scaleLinear()
              .domain([Math.min(0, minX), maxX])
              .range([this.margin.left, this.width - this.margin.right]);

    let minY = Math.min(d3.min(data, d => d.y));
    let maxY = Math.max(d3.max(data, d => d.y));
    let y = d3.scaleLinear()
              .domain([Math.min(0, minY), maxY])
              .range([this.height - this.margin.bottom, this.margin.top]);

    // draw axes
    var xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x).ticks(this.width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", this.width)
                .attr("y", this.margin.bottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end"));

    var yAxis = g => g
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -this.margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start"));

    const gx = this.svg.append("g");

    const gy = this.svg.append("g");

    let grid = (g, x, y) => g
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call(g => g
        .selectAll(".x")
        .data(x.ticks(12))
        .join(
          enter => enter.append("line").attr("class", "x").attr("y2", this.height),
          update => update,
          exit => exit.remove()
        )
          .attr("x1", d => 0.5 + x(d))
          .attr("x2", d => 0.5 + x(d)))
      .call(g => g
        .selectAll(".y")
        .data(y.ticks(12 * this.height / this.width))
        .join(
          enter => enter.append("line").attr("class", "y").attr("x2", this.width),
          update => update,
          exit => exit.remove()
        )
          .attr("y1", d => 0.5 + y(d))
          .attr("y2", d => 0.5 + y(d)));

    const zoom = d3.zoom()
    .scaleExtent([0.5, 32])
    .on("zoom", zoomed);

    const gGrid = this.svg.append("g");

    let gDot = this.svg.append("g")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("fill", "none")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 3);

    this.svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

  
    function zoomed({transform}) {
      const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
      const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
      gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
      gx.call(xAxis, zx);
      gy.call(yAxis, zy);
      gGrid.call(grid, zx, zy);
    }

    return Object.assign(this.svg.node(), {
      reset() {
        this.svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity);
      }
    });
  }
}
