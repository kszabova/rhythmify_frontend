import { Component, Input, OnInit } from '@angular/core';
import { IStackedHistogram } from 'src/app/interfaces/stacked-histogram.interface';

import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-histogram',
  templateUrl: './stacked-histogram.component.html',
  styleUrls: ['./stacked-histogram.component.css']
})
export class StackedHistogramComponent implements OnInit {

  @Input() set data(data: IStackedHistogram[]) { 
    d3.select("figure#" + this.figureID).select("svg").remove();    
    this.maxValue = d3.max(data, (d: any) => d.value as number);
    this.createSvg(); 
    this.drawHist(data)
  };
  @Input() chartTitle: string;
  @Input() groupName: string;
  @Input() valueXName: string;
  @Input() valueYName: string;
  @Input() figureID: string;

  private svg;
  private margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 50
  }
  private width = 700;
  private height = 500;
  private maxValue: number;

  constructor() { }

  ngOnInit(): void {
  }

  createSvg(): void {
    this.svg = d3.select("figure#" + this.figureID)
                 .append("svg")
                 .attr("width", this.width)
                 .attr("height", this.height + 50)
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  drawHist(data: IStackedHistogram[]): void {

    // create the bin function
    const bins = d3.bin().domain([0, this.maxValue]).thresholds(100);

    // group data
    const groupedData = d3.group(data, d => d.group);
    const groups = Array.from(groupedData.keys());
    const histDataByGroup = []
    groupedData.forEach((value, key, map) => {

      var currentGroupHistData = bins(value.map((d) => d.value));

      if (histDataByGroup.length === 0) {
        currentGroupHistData.forEach((d) => histDataByGroup.push({}));
      }

      currentGroupHistData.forEach((values, idx) => {
        histDataByGroup[idx][key] = values.length;
      });
    });

    // stack data by group
    // the stacked data looks like this:
    // [ [group1_value1, group1_value2, group1_value3, ... ],
    //   [group2_value1, group2_value2, group2_value3, ... ], ... ]
    var stackedHistData = d3.stack()
                            .keys(groups)(histDataByGroup)
                            .slice(0, 10);
    
    // create scales
    const xScale = d3.scaleLinear()
                     .domain([0, stackedHistData[0].length])
                     .range([0, this.width - this.margin.right]);

    var upperLimit = d3.max(stackedHistData[stackedHistData.length - 1], d => d[1]);
    const yScale = d3.scaleLinear()
                     .domain([0, upperLimit])
                     .range([this.height - this.margin.bottom, this.margin.top]);

    var color = d3.schemeCategory10;
    // create groups for each group and populate them with their data
    var sel = this.svg.selectAll("." + this.groupName)
            .data(stackedHistData)
            .enter()
            .append("g")
            .attr("class", this.groupName)
            .attr("id", (d, i) => groups[i])
            .style("fill", (d, i) => color[i])
            .style("stroke", (d, i) => d3.rgb(color[i]).darker())

    // for each genre group, draw the bars
    sel.selectAll(".bar")
            .data((d) => d)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => i * xScale(2))
            .attr("width", xScale(2))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]));    
    
    // draw y-axis
    this.svg.append("g")
            .call(d3.axisLeft(yScale));

    // draw x-axis
    const xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(this.width / 40 ).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", this.width - this.margin.left)
                .attr("y", -4)
                .attr("fill", "currentColor")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text((d, i) => i * 2 + ""));

    this.svg.append("g").call(xAxis);

    // legend
    const legendX = this.width - 200;
    const legendY = 100;
    groups.forEach((value, idx) => {
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
