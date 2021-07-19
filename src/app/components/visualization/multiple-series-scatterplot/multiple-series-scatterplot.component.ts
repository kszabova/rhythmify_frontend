import { Component, OnInit, Input } from '@angular/core';
import { IScatterData } from 'src/app/interfaces/scatter-data.interface';
import { Router } from '@angular/router';

import * as d3 from 'd3';

@Component({
  selector: 'app-multiple-series-scatterplot',
  templateUrl: './multiple-series-scatterplot.component.html',
  styleUrls: ['./multiple-series-scatterplot.component.css']
})
export class MultipleSeriesScatterplotComponent implements OnInit {

  @Input() set data(data: IScatterData[]) { 
    d3.select("figure#multi-scatter").select("svg").remove();
    this.createSvg(); 
    this.drawPlot(data)
  };
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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createSvg(): void {
    this.svg = d3.select("figure#multi-scatter")
                 .append("svg")
                 .attr("width", this.width + 200)
                 .attr("height", this.height);
  }

  drawPlot(data: IScatterData[]): void {
    // create scales
    var minX = Math.min(d3.min(data, d => d.x));
    var maxX = Math.max(d3.max(data, d => d.x));
    var x = d3.scaleLinear()
              .domain([Math.min(0, minX), maxX])
              .range([this.margin.left, this.width - this.margin.right]);

    var minY = Math.min(d3.min(data, d => d.y));
    var maxY = Math.max(d3.max(data, d => d.y));
    var y = d3.scaleLinear()
              .domain([Math.min(0, minY), maxY])
              .range([this.height - this.margin.bottom, this.margin.top]);

    // draw the data
    let color = d3.schemeCategory10;
    let groupNames = [];
    this.svg.append("g")
            .attr("stroke-width", 0)
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "datapoint")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("fill", d => {
              if (groupNames.includes(d.group)) {
                return color[groupNames.indexOf(d.group) % 10];
              }
              else {
                groupNames.push(d.group);
                return color[groupNames.indexOf(d.group) % 10];
              }
            })
            .style("stroke", d => {
              if (groupNames.includes(d.group)) {
                return color[groupNames.indexOf(d.group) % 10];
              }
              else {
                groupNames.push(d.group);
                return color[groupNames.indexOf(d.group) % 10];
              }
            })
            .attr("r", 3)
            .on('click', (_, d) =>
              this.router.navigate(['/chants', d.id])
            );

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

    // legend
    const legendX = this.width;
    const legendY = 100;
    groupNames.forEach((value, idx) => {
      // color marker
      this.svg.append("circle")
        .attr("cx", legendX)
        .attr("cy", legendY + 30 * idx)
        .attr("r", 6).style("fill", color[idx % 10]);
      // group name
      this.svg.append("text")
        .attr("x", legendX + 20)
        .attr("y", legendY + 30 * idx)
        .text(value).style("font-size", "15px")
        .attr("alignment-baseline","middle");
    });

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
