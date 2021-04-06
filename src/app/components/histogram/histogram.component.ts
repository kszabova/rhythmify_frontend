import { Component, OnInit } from '@angular/core';
import { ChantService } from 'src/app/services/chant.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

  hist_data: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(
    private chantService: ChantService,
  ) { }

  ngOnInit(): void {
    this.chantService.findByIncipit("Ab occultis").subscribe(
      (data:(any)) => this.hist_data = data.map(chant => ({"incipit": chant.incipit,
                                                          "vol_length": chant.volpiano.length}))
    );
    this.createSvg();
    this.drawBars(this.hist_data);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#histogram")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.incipit))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.incipit))
  .attr("y", d => y(d.vol_length))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.vol_length))
  .attr("fill", "#d04a35");
}

}
