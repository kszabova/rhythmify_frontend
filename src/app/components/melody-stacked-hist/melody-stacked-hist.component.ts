import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-melody-stacked-hist',
  templateUrl: './melody-stacked-hist.component.html',
  styleUrls: ['./melody-stacked-hist.component.css']
})
export class MelodyStackedHistComponent implements OnInit {

  data: any;
  private svg;
  private margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 50
  }
  private width = 960;
  private height = 500;

  private minValue;
  private maxValue;

  constructor(
    private chantService: ChantService
  ) { }

  ngOnInit(): void {
    this.chantService.getAll().subscribe(
      (data: any) => {
        this.data = data.map(
          chant => ({
            "melody_length": chant.volpiano.split("---").length,
            "genre": chant.genre_id
          })
        );
        this.minValue = d3.min(this.data, (d: any) => d.melody_length);
        this.maxValue = d3.max(this.data, (d: any) => d.melody_length);
        this.createSvg();
        this.drawHist(this.data);
      }
    )
  }

  createSvg(): void {
    this.svg = d3.select("figure#hist")
                 .append("svg")
                 .attr("width", this.width)
                 .attr("height", this.height)
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  drawHist(data: any[]): void {
    const bins = d3.bin().domain([0, this.maxValue]).thresholds(100);
    const groupedGenres = d3.group(data, d => d.genre);
    const genres = Array.from(groupedGenres.keys());
    const histDataByGenre = []
    groupedGenres.forEach((value, key, map) => {

      var histData = bins(value.map((d) => d.melody_length));

      if (histDataByGenre.length === 0) {
        histData.forEach((d) => histDataByGenre.push({}));
      }

      histData.forEach((values, idx) => {
        histDataByGenre[idx][key] = values.length;
      });
    });

    var stackedHistData = d3.stack()
                            .keys(genres)(histDataByGenre)
                            .slice(0, 10);
    
    const xScale = d3.scaleLinear()
                     .domain([0, stackedHistData[0].length])
                     .range([this.margin.left, this.width - this.margin.right]);

    var upperLimit = d3.max(stackedHistData[stackedHistData.length - 1], d => d[1] as number);
    const yScale = d3.scaleLinear()
                     .domain([0, upperLimit])
                     .range([this.height - this.margin.bottom, this.margin.top]);

    console.log(yScale(upperLimit));
    var color = d3.schemeCategory10;
    console.log(yScale(0));
    console.log(yScale(2));
    console.log(yScale(1598));
    this.svg.selectAll(".genre")
            .data(stackedHistData)
            .enter()
            .append("g")
            .attr("class", "genre")
            .attr("id", (d, i) => genres[i])
            .style("fill", (d, i) => color[i])
            .style("stroke", (d, i) => d3.rgb(color[i]).darker())
            .selectAll(".bar")
            .data((d) => d)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => i * 20)
            .attr("width", 20)
            .attr("y", (d, i) => yScale(d[1]))
            .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]));    
    
    this.svg.append("g")
            .call(d3.axisLeft(yScale));
    const xAxis = g => g
            .attr("transform", `translate(${-this.margin.left},${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(this.width / 40 ).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", this.width - this.margin.left)
                .attr("y", -4)
                .attr("fill", "currentColor")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text((d, i) => i * 2 + ""));
    this.svg.append("g").call(xAxis);
  }

}
