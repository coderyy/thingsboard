///
/// Copyright © 2016-2020 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

// tslint:disable-next-line:no-reference
/// <reference path="../../../../../../../src/typings/jquery.flot.typings.d.ts" />

import { JsonSettingsSchema, DataKey, DatasourceData, Datasource } from '@shared/models/widget.models';
import * as moment_ from 'moment';

export declare type ChartType = 'line' | 'pie' | 'bar' | 'state' | 'graph';

export declare type TbFlotSettings = TbFlotBaseSettings & TbFlotGraphSettings & TbFlotBarSettings & TbFlotPieSettings;

export declare type TooltipValueFormatFunction = (value: any) => string;

export declare type TbFlotTicksFormatterFunction = (t: number, a?: TbFlotPlotAxis) => string;

export interface TbFlotSeries extends DatasourceData, JQueryPlotSeriesOptions {
  dataKey: TbFlotDataKey;
  xaxisIndex?: number;
  yaxisIndex?: number;
  yaxis?: number;
}

export interface TbFlotDataKey extends DataKey {
  settings?: TbFlotKeySettings;
  tooltipValueFormatFunction?: TooltipValueFormatFunction;
}

export interface TbFlotPlotAxis extends JQueryPlotAxis, TbFlotAxisOptions {
  options: TbFlotAxisOptions;
}

export interface TbFlotAxisOptions extends JQueryPlotAxisOptions {
  tickUnits?: string;
  hidden?: boolean;
  keysInfo?: Array<{hidden: boolean}>;
  ticksFormatterFunction?: TbFlotTicksFormatterFunction;
}

export interface TbFlotPlotDataSeries extends JQueryPlotDataSeries {
  datasource?: Datasource;
  dataKey?: TbFlotDataKey;
  percent?: number;
}

export interface TbFlotPlotItem extends jquery.flot.item {
  series: TbFlotPlotDataSeries;
}

export interface TbFlotHoverInfo {
  seriesHover: Array<TbFlotSeriesHoverInfo>;
  time?: any;
}

export interface TbFlotSeriesHoverInfo {
  hoverIndex: number;
  units: string;
  decimals: number;
  label: string;
  color: string;
  index: number;
  tooltipValueFormatFunction: TooltipValueFormatFunction;
  value: any;
  time: any;
  distance: number;
}

export interface TbFlotGridSettings {
  color: string;
  backgroundColor: string;
  tickColor: string;
  outlineWidth: number;
  verticalLines: boolean;
  horizontalLines: boolean;
  minBorderMargin: number;
  margin: number;
}

export interface TbFlotXAxisSettings {
  showLabels: boolean;
  title: string;
  color: boolean;
}

export interface TbFlotSecondXAxisSettings {
  axisPosition: TbFlotXAxisPosition;
  showLabels: boolean;
  title: string;
}

export interface TbFlotYAxisSettings {
  min: number;
  max: number;
  showLabels: boolean;
  title: string;
  color: string;
  ticksFormatter: string;
  tickDecimals: number;
  tickSize: number;
}

export interface TbFlotBaseSettings {
  stack: boolean;
  shadowSize: number;
  fontColor: string;
  fontSize: number;
  tooltipIndividual: boolean;
  tooltipCumulative: boolean;
  tooltipValueFormatter: string;
  hideZeros: boolean;
  grid: TbFlotGridSettings;
  xaxis: TbFlotXAxisSettings;
  yaxis: TbFlotYAxisSettings;
}

export interface TbFlotComparisonSettings {
  comparisonEnabled: boolean;
  timeForComparison: moment_.unitOfTime.DurationConstructor;
  xaxisSecond: TbFlotSecondXAxisSettings;
}

export interface TbFlotGraphSettings extends TbFlotBaseSettings, TbFlotComparisonSettings {
  smoothLines: boolean;
}

export interface TbFlotBarSettings extends TbFlotBaseSettings, TbFlotComparisonSettings {
  defaultBarWidth: number;
}

export interface TbFlotPieSettings {
  radius: number;
  innerRadius: number;
  tilt: number;
  animatedPie: boolean;
  stroke: {
    color: string;
    width: number;
  };
  showLabels: boolean;
  fontColor: string;
  fontSize: number;
}

export declare type TbFlotYAxisPosition = 'left' | 'right';
export declare type TbFlotXAxisPosition = 'top' | 'bottom';

export interface TbFlotKeySettings {
  excludeFromStacking: boolean;
  showLines: boolean;
  fillLines: boolean;
  showPoints: boolean;
  showPointShape: string;
  pointShapeFormatter: string;
  showPointsLineWidth: number;
  showPointsRadius: number;
  lineWidth: number;
  tooltipValueFormatter: string;
  showSeparateAxis: boolean;
  axisMin: number;
  axisMax: number;
  axisTitle: string;
  axisTickDecimals: number;
  axisTickSize: number;
  axisPosition: TbFlotYAxisPosition;
  axisTicksFormatter: string;
}

export function flotSettingsSchema(chartType: ChartType): JsonSettingsSchema {

  const schema: JsonSettingsSchema = {
    schema: {
      type: 'object',
      title: 'Settings',
      properties: {
      }
    }
  };

  const properties: any = schema.schema.properties;
  properties.stack = {
    title: 'Stacking',
    type: 'boolean',
    default: false
  };
  if (chartType === 'graph') {
    properties.smoothLines = {
      title: 'Display smooth (curved) lines',
      type: 'boolean',
      default: false
    };
  }
  if (chartType === 'bar') {
    properties.defaultBarWidth = {
      title: 'Default bar width for non-aggregated data (milliseconds)',
      type: 'number',
      default: 600
    };
  }
  properties.shadowSize = {
    title: 'Shadow size',
    type: 'number',
    default: 4
  };
  properties.fontColor =  {
    title: 'Font color',
    type: 'string',
    default: '#545454'
  };
  properties.fontSize = {
    title: 'Font size',
    type: 'number',
    default: 10
  };
  properties.tooltipIndividual = {
    title: 'Hover individual points',
    type: 'boolean',
    default: false
  };
  properties.tooltipCumulative = {
    title: 'Show cumulative values in stacking mode',
    type: 'boolean',
    default: false
  };
  properties.tooltipValueFormatter = {
    title: 'Tooltip value format function, f(value)',
    type: 'string',
    default: ''
  };
  properties.hideZeros = {
    title: 'Hide zero/false values from tooltip',
    type: 'boolean',
    default: false
  };

  properties.grid = {
    title: 'Grid settings',
    type: 'object',
    properties: {
      color: {
        title: 'Primary color',
        type: 'string',
        default: '#545454'
      },
      backgroundColor: {
        title: 'Background color',
        type: 'string',
        default: null
      },
      tickColor: {
        title: 'Ticks color',
        type: 'string',
        default: '#DDDDDD'
      },
      outlineWidth: {
        title: 'Grid outline/border width (px)',
        type: 'number',
        default: 1
      },
      verticalLines: {
        title: 'Show vertical lines',
        type: 'boolean',
        default: true
      },
      horizontalLines: {
        title: 'Show horizontal lines',
        type: 'boolean',
        default: true
      }
    }
  };

  properties.xaxis = {
    title: 'X axis settings',
    type: 'object',
    properties: {
      showLabels: {
        title: 'Show labels',
        type: 'boolean',
        default: true
      },
      title: {
        title: 'Axis title',
        type: 'string',
        default: null
      },
      color: {
        title: 'Ticks color',
        type: 'string',
        default: null
      }
    }
  };

  properties.yaxis = {
    title: 'Y axis settings',
    type: 'object',
    properties: {
      min: {
        title: 'Minimum value on the scale',
        type: 'number',
        default: null
      },
      max: {
        title: 'Maximum value on the scale',
        type: 'number',
        default: null
      },
      showLabels: {
        title: 'Show labels',
        type: 'boolean',
        default: true
      },
      title: {
        title: 'Axis title',
        type: 'string',
        default: null
      },
      color: {
        title: 'Ticks color',
        type: 'string',
        default: null
      },
      ticksFormatter: {
        title: 'Ticks formatter function, f(value)',
        type: 'string',
        default: ''
      },
      tickDecimals: {
        title: 'The number of decimals to display',
        type: 'number',
        default: 0
      },
      tickSize: {
        title: 'Step size between ticks',
        type: 'number',
        default: null
      }
    }
  };

  schema.schema.required = [];
  schema.form = ['stack'];
  if (chartType === 'graph') {
    schema.form.push('smoothLines');
  }
  if (chartType === 'bar') {
    schema.form.push('defaultBarWidth');
  }
  schema.form.push('shadowSize');
  schema.form.push({
    key: 'fontColor',
    type: 'color'
  });
  schema.form.push('fontSize');
  schema.form.push('tooltipIndividual');
  schema.form.push('tooltipCumulative');
  schema.form.push({
    key: 'tooltipValueFormatter',
    type: 'javascript'
  });
  schema.form.push('hideZeros');
  schema.form.push({
    key: 'grid',
    items: [
      {
        key: 'grid.color',
        type: 'color'
      },
      {
        key: 'grid.backgroundColor',
        type: 'color'
      },
      {
        key: 'grid.tickColor',
        type: 'color'
      },
      'grid.outlineWidth',
      'grid.verticalLines',
      'grid.horizontalLines'
    ]
  });
  schema.form.push({
    key: 'xaxis',
    items: [
      'xaxis.showLabels',
      'xaxis.title',
      {
        key: 'xaxis.color',
        type: 'color'
      }
    ]
  });
  schema.form.push({
    key: 'yaxis',
    items: [
      'yaxis.min',
      'yaxis.max',
      'yaxis.tickDecimals',
      'yaxis.tickSize',
      'yaxis.showLabels',
      'yaxis.title',
      {
        key: 'yaxis.color',
        type: 'color'
      },
      {
        key: 'yaxis.ticksFormatter',
        type: 'javascript'
      }
    ]
  });
  if (chartType === 'graph' || chartType === 'bar') {
    schema.groupInfoes = [{
      formIndex: 0,
      GroupTitle: 'Common Settings'
    }];
    schema.form = [schema.form];
    schema.schema.properties = {...schema.schema.properties, ...chartSettingsSchemaForComparison.schema.properties};
    schema.schema.required = schema.schema.required.concat(chartSettingsSchemaForComparison.schema.required);
    schema.form.push(chartSettingsSchemaForComparison.form);
    schema.groupInfoes.push({
      formIndex: schema.groupInfoes.length,
      GroupTitle:'Comparison Settings'
    });
  }
  return schema;
}

const chartSettingsSchemaForComparison: JsonSettingsSchema = {
  schema: {
    title: 'Comparison Settings',
    type: 'object',
    properties: {
      comparisonEnabled: {
        title: 'Enable comparison',
        type: 'boolean',
        default: false
      },
      timeForComparison: {
        title: 'Time to show historical data',
        type: 'string',
        default: 'months'
      },
      xaxisSecond: {
        title: 'Second X axis',
        type: 'object',
        properties: {
          axisPosition: {
            title: 'Axis position',
            type: 'string',
            default: 'top'
          },
          showLabels: {
            title: 'Show labels',
            type: 'boolean',
            default: true
          },
          title: {
            title: 'Axis title',
            type: 'string',
            default: null
          }
        }
      }
    },
    required: []
  },
  form: [
    'comparisonEnabled',
    {
      key: 'timeForComparison',
      type: 'rc-select',
      multiple: false,
      items: [
        {
          value: 'days',
          label: 'Day ago'
        },
        {
          value: 'weeks',
          label: 'Week ago'
        },
        {
          value: 'months',
          label: 'Month ago (default)'
        },
        {
          value: 'years',
          label: 'Year ago'
        }
      ]
    },
    {
      key: 'xaxisSecond',
      items: [
        {
          key: 'xaxisSecond.axisPosition',
          type: 'rc-select',
          multiple: false,
          items: [
            {
              value: 'top',
              label: 'Top (default)'
            },
            {
              value: 'bottom',
              label: 'Bottom'
            }
          ]
        },
        'xaxisSecond.showLabels',
        'xaxisSecond.title',
      ]
    }
  ]
};

export const flotPieSettingsSchema: JsonSettingsSchema = {
    schema: {
      type: 'object',
      title: 'Settings',
      properties: {
        radius: {
          title: 'Radius',
          type: 'number',
          default: 1
        },
        innerRadius: {
          title: 'Inner radius',
          type: 'number',
          default: 0
        },
        tilt: {
          title: 'Tilt',
          type: 'number',
          default: 1
        },
        animatedPie: {
          title: 'Enable pie animation (experimental)',
          type: 'boolean',
          default: false
        },
        stroke: {
          title: 'Stroke',
          type: 'object',
          properties: {
            color: {
              title: 'Color',
              type: 'string',
              default: ''
            },
            width: {
              title: 'Width (pixels)',
              type: 'number',
              default: 0
            }
          }
        },
        showLabels: {
          title: 'Show labels',
          type: 'boolean',
          default: false
        },
        fontColor: {
          title: 'Font color',
          type: 'string',
          default: '#545454'
        },
        fontSize: {
          title: 'Font size',
          type: 'number',
          default: 10
        }
      },
      required: []
    },
    form: [
      'radius',
      'innerRadius',
      'animatedPie',
      'tilt',
      {
        key: 'stroke',
        items: [
          {
            key: 'stroke.color',
            type: 'color'
          },
          'stroke.width'
        ]
      },
      'showLabels',
      {
        key: 'fontColor',
        type: 'color'
      },
      'fontSize'
    ]
};

export function flotDatakeySettingsSchema(defaultShowLines: boolean, chartType: ChartType): JsonSettingsSchema {
  const schema: JsonSettingsSchema = {
    schema: {
      type: 'object',
      title: 'DataKeySettings',
      properties: {
        excludeFromStacking: {
          title: 'Exclude from stacking(available in "Stacking" mode)',
          type: 'boolean',
          default: false
        },
        showLines: {
          title: 'Show lines',
          type: 'boolean',
          default: defaultShowLines
        },
        fillLines: {
          title: 'Fill lines',
          type: 'boolean',
          default: false
        },
        showPoints: {
          title: 'Show points',
          type: 'boolean',
          default: false
        },
        showPointShape: {
          title: 'Select point shape:',
          type: 'string',
          default: 'circle'
        },
        pointShapeFormatter: {
          title: 'Point shape format function, f(ctx, x, y, radius, shadow)',
          type: 'string',
          default: 'var size = radius * Math.sqrt(Math.PI) / 2;\n' +
            'ctx.moveTo(x - size, y - size);\n' +
            'ctx.lineTo(x + size, y + size);\n' +
            'ctx.moveTo(x - size, y + size);\n' +
            'ctx.lineTo(x + size, y - size);'
        },
        showPointsLineWidth: {
          title: 'Line width of points',
          type: 'number',
          default: 5
        },
        showPointsRadius: {
          title: 'Radius of points',
          type: 'number',
          default: 3
        },
        tooltipValueFormatter: {
          title: 'Tooltip value format function, f(value)',
          type: 'string',
          default: ''
        },
        showSeparateAxis: {
          title: 'Show separate axis',
          type: 'boolean',
          default: false
        },
        axisMin: {
          title: 'Minimum value on the axis scale',
          type: 'number',
          default: null
        },
        axisMax: {
          title: 'Maximum value on the axis scale',
          type: 'number',
          default: null
        },
        axisTitle: {
          title: 'Axis title',
          type: 'string',
          default: ''
        },
        axisTickDecimals: {
          title: 'Axis tick number of digits after floating point',
          type: 'number',
          default: null
        },
        axisTickSize: {
          title: 'Axis step size between ticks',
          type: 'number',
          default: null
        },
        axisPosition: {
          title: 'Axis position',
          type: 'string',
          default: 'left'
        },
        axisTicksFormatter: {
          title: 'Ticks formatter function, f(value)',
          type: 'string',
          default: ''
        }
      },
      required: ['showLines', 'fillLines', 'showPoints']
    },
    form: [
      'excludeFromStacking',
      'showLines',
      'fillLines',
      'showPoints',
      {
        key: 'showPointShape',
        type: 'rc-select',
        multiple: false,
        items: [
          {
            value: 'circle',
            label: 'Circle'
          },
          {
            value: 'cross',
            label: 'Cross'
          },
          {
            value: 'diamond',
            label: 'Diamond'
          },
          {
            value: 'square',
            label: 'Square'
          },
          {
            value: 'triangle',
            label: 'Triangle'
          },
          {
            value: 'custom',
            label: 'Custom function'
          }
        ]
      },
      {
        key: 'pointShapeFormatter',
        type: 'javascript'
      },
      'showPointsLineWidth',
      'showPointsRadius',
      {
        key: 'tooltipValueFormatter',
        type: 'javascript'
      },
      'showSeparateAxis',
      'axisMin',
      'axisMax',
      'axisTitle',
      'axisTickDecimals',
      'axisTickSize',
      {
        key: 'axisPosition',
        type: 'rc-select',
        multiple: false,
        items: [
          {
            value: 'left',
            label: 'Left'
          },
          {
            value: 'right',
            label: 'Right'
          }
        ]
      },
      {
        key: 'axisTicksFormatter',
        type: 'javascript'
      }
    ]
  };

  const properties = schema.schema.properties;
  if (chartType === 'graph' || chartType === 'bar') {
    properties.comparisonSettings = {
      title: 'Comparison Settings',
      type: 'object',
      properties: {
        showValuesForComparison: {
          title: 'Show historical values for comparison',
          type: 'boolean',
          default: true
        },
        comparisonValuesLabel: {
          title: 'Historical values label',
          type: 'string',
          default: ''
        },
        color: {
          title: 'Color',
          type: 'string',
          default: ''
        }
      },
      required: ['showValuesForComparison']
    };
    schema.form.push({
      key: 'comparisonSettings',
      items: [
        'comparisonSettings.showValuesForComparison',
        'comparisonSettings.comparisonValuesLabel',
        {
          key: 'comparisonSettings.color',
          type: 'color'
        }
      ]
    });
  }

  return schema;
}