
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {createSelector} from 'reselect';
import {format} from 'd3-format';

import {
  SCALE_TYPES,
  SCALE_FUNC,
  ALL_FIELD_TYPES
} from 'constants/default-settings';
import {RadialChart, Hint} from 'react-vis';

const DonutPanel = styled.div `
  display: flex;
  flex-direction: column;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;

  .control-panel-item {
    margin-top: 12px 0 8px 0;
  }

  .control-panel-item:nth-child(2) {
    display: flex;
    justify-content: flex-end;
  }

  p {
    color: ${props => props.theme.labelColor};
    margin: 0;
  }

  .control-panel__title{
    font-weight: 500;
    color: ${props => props.theme.textColorHl};    
  }
`;

export class DonutChart extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      data, 
      activeIndicator,
      title,
      legends,
      values,
      xLabel
    } = this.props;

    // const legends = this.legendsSelector(this.props);
    // const legends = this.legendsSelector(this.props.scaleType, this.props.domain, this.props.fieldType, this.props.range);

    let pData;
    let aData = [0,0,0,0,0,0];
    
    // console.log('donut-chart data ' + activeIndicator);
    // console.log(pData);
    // console.log(aData);
    // console.log(data);
    // console.log(activeIndicator);
    
    if(legends) {
      pData = legends.data.map((d, idx) => ({
        angle: 0,
        color: d,
      })) ;

      // console.log('donut-chart data 2 ' + activeIndicator);
      // console.log(pData);
      // console.log(aData);

      for(var i=0; i<data.length; i++) {
          for(var j=0; j<legends.data.length; j++) {
              if(data[i][activeIndicator] >= legends.labels[j].low && data[i][activeIndicator] <= legends.labels[j].high) {
                  pData[j].angle = pData[j].angle+1;
                  aData[j]++;
                  break;
              }
          }
      }

      // console.log('donut-chart data 3 ' + activeIndicator);
      // console.log(pData);
      // console.log(aData);
    } else if(values && xLabel) {
      pData = values.map((d) => ({
        angle: d[xLabel]
      }));
      // console.error('donut');
      // console.error(pData);
    }
    

    return (
      <DonutPanel>
        <ControlPanel>
          <div className="control-panel-item">
            <p className="control-panel__title">{title}</p>            
          </div>
        </ControlPanel>
        <RadialChart 
          animation
          data={pData} 
          innerRadius={50}
          radius={70}
          width={280} 
          height={170} 
          colorType={legends?"literal":"category"}
          >

          </RadialChart>
      </DonutPanel>
    );
  }
}

const DonutChartFactory = () => DonutChart;
export default DonutChartFactory;
