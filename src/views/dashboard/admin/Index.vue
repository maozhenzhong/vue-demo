<template>
  <div class="cockpit-container">
    <div class="grid-content meter-bar">
      <el-row :gutter="12">
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData1"
            :settings="gSettings1"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData2"
            :settings="gSettings2"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData3"
            :settings="gSettings3"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData4"
            :settings="gSettings4"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData5"
            :settings="gSettings5"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="4">
          <ve-gauge
            :data="gData6"
            :settings="gSettings6"
            :height="gHeight"
            :width="gWidth"></ve-gauge>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content" style="height: 240px;">
          <ve-line
            :data="hLineData"
            :settings="hLineSettings"
            :legend-visible="false"
            :title="hLTitle"
            :grid="chartGrid"
            :toolbox="chartToolBox"
            :height="hHeight"></ve-line>
        </div>
        <div class="grid-content" style="height: 240px;">
            <ve-histogram
              :data="histogramData"
              :settings="histogramSettings"
              :legend-visible="false"
              :title="histogramTitle"
              :toolbox="chartToolBox"
              :height="hHeight"></ve-histogram>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content" style="height: 492px;">
          <ve-pie
            :data="pieData"
            :title="pieTitle"
            :settings="pieSettings"
            :legend-visible="false"
            :grid="chartGrid"
            :toolbox="chartToolBox"
            :height="pHeight"></ve-pie>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="grid-content" style="height: 240px;">
          <ve-radar
              :data="radarData"
              :settings="radarSettings"
              :legend-visible="false"
              :title="radarTitle"
              :grid="chartGrid"
              :toolbox="chartToolBox"
              :height="hHeight"></ve-radar>
        </div>
        <div class="grid-content" style="height: 240px;">
          <ve-candle
            :data="candleData"
            :settings="candleSettings"
            :title="candleTitle"
            :toolbox="chartToolBox"
            :legend-visible="false"
            :height="hHeight"></ve-candle>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { VLine, VBar, VRing, VRadar, VCandle, VHistogram, VFunnel, VGauge } from 'v-charts'
import Vue from 'vue'
import VCharts from 'v-charts'
import 'echarts/lib/component/toolbox'
import 'echarts/theme/macarons'
import 'echarts/lib/component/title'

Vue.use(VCharts)
export default {
  name: 'dashboard',
  data() {
    return {
      gHeight: '220px',
      gWidth: '100%',
      hHeight: '240px',
      pHeight: '492px'
    }
  },
  created() {
    this.gData1 = {
      columns: ['type', 'value'],
      rows: [
        { type: '转速', value: 80 }
      ]
    }
    this.gData2 = {
      columns: ['type', 'value'],
      rows: [
        { type: '速度', value: 120 }
      ]
    }
    this.gData3 = {
      columns: ['type', 'value'],
      rows: [
        { type: '速度', value: 120 }
      ]
    }
    this.gData4 = {
      columns: ['type', 'value'],
      rows: [
        { type: '速度', value: 120 }
      ]
    }
    this.gData5 = {
      columns: ['type', 'value'],
      rows: [
        { type: '速度', value: 120 }
      ]
    }
    this.gData6 = {
      columns: ['type', 'value'],
      rows: [
        { type: '油表', value: 0.5 },
        { type: '水表', value: 0.5 }
      ]
    }
    this.gSettings1 = {
      dataName: {
        '转速': 'x1000 r/min'
      },
      seriesMap: {
        '转速': {
          name: '转速',
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '50%',
          min: 0,
          max: 7,
          endAngle: 45,
          splitNumber: 7,
          axisLine: {
            lineStyle: {
              width: 8
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          pointer: {
            width: 5
          },
          detail: {
            show: false
          }
        }
      }
    }
    this.gSettings2 = {
      dataName: {
        '速度': 'km/h'
      },
      seriesMap: {
        '速度': {
          type: 'gauge',
          z: 3,
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '80%',
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            borderRadius: 2,
            padding: 3,
            textShadowBlur: 2,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          },
          title: {
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
          }
        }
      }
    }
    this.gSettings3 = {
      dataName: {
        '速度': 'km/h'
      },
      seriesMap: {
        '速度': {
          type: 'gauge',
          z: 3,
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '80%',
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            borderRadius: 2,
            padding: 3,
            textShadowBlur: 2,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          },
          title: {
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
          }
        }
      }
    }
    this.gSettings4 = {
      dataName: {
        '速度': 'km/h'
      },
      seriesMap: {
        '速度': {
          type: 'gauge',
          z: 3,
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '80%',
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            borderRadius: 2,
            padding: 3,
            textShadowBlur: 2,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          },
          title: {
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
          }
        }
      }
    }
    this.gSettings5 = {
      dataName: {
        '速度': 'km/h'
      },
      seriesMap: {
        '速度': {
          type: 'gauge',
          z: 3,
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '80%',
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            borderRadius: 2,
            padding: 3,
            textShadowBlur: 2,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          },
          title: {
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
          }
        }
      }
    }
    this.gSettings6 = {
      seriesMap: {
        '油表': {
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '50%',
          min: 0,
          max: 2,
          startAngle: 135,
          endAngle: 45,
          splitNumber: 2,
          axisLine: {
            lineStyle: {
              width: 8
            }
          },
          axisTick: {
            splitNumber: 5,
            length: 10,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            formatter(v) {
              switch (v + '') {
                case '0' : return 'E'
                case '1' : return 'Gas'
                case '2' : return 'F'
              }
            }
          },
          splitLine: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          pointer: {
            width: 2
          },
          title: {
            show: false
          },
          detail: {
            show: false
          }
        },
        '水表': {
          type: 'gauge',
          center: ['50%', '50%'],
          radius: '50%',
          min: 0,
          max: 2,
          startAngle: 315,
          endAngle: 225,
          splitNumber: 2,
          axisLine: {
            lineStyle: {
              width: 8
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter(v) {
              switch (v + '') {
                case '0' : return 'H'
                case '1' : return 'Water'
                case '2' : return 'C'
              }
            }
          },
          splitLine: {
            length: 15,
            lineStyle: {
              color: 'auto'
            }
          },
          pointer: {
            width: 2
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{ value: 0.5, name: 'gas' }]
        }
      }
    }
    this.hLineTitle = {
      shou: true,
      text: '平台热销产品统计',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: 12
    }
    this.chartGrid = {
      top: 52,
      right: 12,
      bottom: 20,
      left: 12
    }
    this.chartToolBox = {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      },
      top: 6
    }
    this.hLTitle = {
      shou: true,
      text: '平台热销产品统计',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: [14, 12, 0, 0]
    }
    this.hLineData = {
      columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
        { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
        { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
        { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
      ]
    }
    this.hLineSettings = {}
    this.hBarTitle = {
      shou: true,
      text: '机构热销产品统计',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: 12
    }
    this.hBarData = {
      columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
        { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
        { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
        { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
      ]
    }
    this.hBarSettings = {
      dimension: '日期',
      metrics: '销售额-1季度',
      dataType: 'KMB',
      selectedMode: 'single',
      hoverAnimation: false,
      radius: [100, 80],
      offsetY: 200
    }
    this.histogramTitle = {
      shou: true,
      text: '机构产品申请数量统计趋势',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: [14, 12, 0, 0]
    }
    this.histogramData = {
      columns: ['日期', '成本', '利润', '占比', '其他'],
      rows: [
        { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
        { '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
        { '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 }
      ]
    }
    this.histogramSettings = {}
    this.radarTitle = {
      shou: true,
      text: '机构热销产品统计',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: [14, 12, 0, 0]
    }
    this.radarData = {
      columns: ['日期', '销售额-1季度', '销售额-2季度', '销售额-3季度', '销售额-4季度', '占比', '其他'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '销售额-3季度': 1523, '销售额-4季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '销售额-3季度': 1223, '销售额-24季度': 1523, '占比': 0.345, '其他': 100 },
        { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '销售额-3季度': 2123, '销售额-4季度': 1523, '占比': 0.7, '其他': 100 },
        { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '销售额-3季度': 4123, '销售额-4季度': 1523, '占比': 0.31, '其他': 100 },
        { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '销售额-3季度': 3123, '销售额-4季度': 1523, '占比': 0.12, '其他': 100 },
        { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '销售额-3季度': 7123, '销售额-4季度': 1523, '占比': 0.65, '其他': 100 }
      ]
    }
    this.radarSettings = {
      symbolSize: 4,
      dimension: ['日期'],
      metrics: ['销售额-1季度', '销售额-2季度', '销售额-3季度', '销售额-4季度', '占比', '其他'],
      dataType: { '占比': 'percent' }
    }
    this.candleTitle = {
      shou: true,
      text: '机构需求对接数量统计趋势',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: [14, 12, 0, 0]
    }
    this.candleData = {
      columns: ['日期', 'open', 'close', 'lowest', 'highest', 'vol'],
      rows: [
        { '日期': '2004-01-05', open: 10411.85, close: 10544.07, lowest: 10411.85, highest: 10575.92, vol: 221290000 },
        { '日期': '2004-01-06', open: 10543.85, close: 10538.66, lowest: 10454.37, highest: 10584.07, vol: 191460000 },
        { '日期': '2004-01-07', open: 10535.46, close: 10529.03, lowest: 10432.12, highest: 10587.55, vol: 225490000 },
        { '日期': '2004-01-08', open: 10530.07, close: 10592.44, lowest: 10480.59, highest: 10651.99, vol: 237770000 },
        { '日期': '2004-01-09', open: 10589.25, close: 10458.89, lowest: 10420.52, highest: 10603.48, vol: 223250000 },
        { '日期': '2004-01-12', open: 10461.55, close: 10485.18, lowest: 10389.85, highest: 10543.03, vol: 197960000 },
        { '日期': '2004-01-13', open: 10485.18, close: 10427.18, lowest: 10341.19, highest: 10539.25, vol: 197310000 },
        { '日期': '2004-01-14', open: 10428.67, close: 10538.37, lowest: 10426.89, highest: 10573.85, vol: 186280000 },
        { '日期': '2004-01-15', open: 10534.52, close: 10553.85, lowest: 10454.52, highest: 10639.03, vol: 260090000 },
        { '日期': '2004-01-16', open: 10556.37, close: 10600.51, lowest: 10503.71, highest: 10666.88, vol: 254170000 },
        { '日期': '2004-01-20', open: 10601.42, close: 10528.66, lowest: 10447.92, highest: 10676.96, vol: 224300000 },
        { '日期': '2004-01-21', open: 10522.77, close: 10623.62, lowest: 10453.11, highest: 10665.72, vol: 214920000 },
        { '日期': '2004-01-22', open: 10624.22, close: 10623.18, lowest: 10545.03, highest: 10717.41, vol: 219720000 },
        { '日期': '2004-01-23', open: 10625.25, close: 10568.29, lowest: 10490.14, highest: 10691.77, vol: 234260000 },
        { '日期': '2004-01-26', open: 10568.12, close: 10702.51, lowest: 10510.44, highest: 10725.18, vol: 186170000 },
        { '日期': '2004-01-27', open: 10701.11, close: 10609.92, lowest: 10579.33, highest: 10748.81, vol: 206560000 },
        { '日期': '2004-01-28', open: 10610.07, close: 10468.37, lowest: 10412.44, highest: 10703.25, vol: 247660000 },
        { '日期': '2004-01-29', open: 10467.41, close: 10510.29, lowest: 10369.92, highest: 10611.56, vol: 273970000 },
        { '日期': '2004-01-30', open: 10510.22, close: 10488.07, lowest: 10385.56, highest: 10551.03, vol: 208990000 },
        { '日期': '2004-02-02', open: 10487.78, close: 10499.18, lowest: 10395.55, highest: 10614.44, vol: 224800000 },
        { '日期': '2004-02-03', open: 10499.48, close: 10505.18, lowest: 10414.15, highest: 10571.48, vol: 183810000 },
        { '日期': '2004-02-04', open: 10503.11, close: 10470.74, lowest: 10394.81, highest: 10567.85, vol: 227760000 },
        { '日期': '2004-02-05', open: 10469.33, close: 10495.55, lowest: 10399.92, highest: 10566.37, vol: 187810000 },
        { '日期': '2004-02-06', open: 10494.89, close: 10593.03, lowest: 10433.74, highest: 10634.81, vol: 182880000 },
        { '日期': '2004-02-09', open: 10592.41, close: 10579.03, lowest: 10433.72, highest: 10634.81, vol: 160720000 },
        { '日期': '2004-02-10', open: 10578.74, close: 10613.85, lowest: 10511.18, highest: 10667.03, vol: 160590000 },
        { '日期': '2004-02-11', open: 10605.48, close: 10737.72, lowest: 10561.55, highest: 10779.41, vol: 277850000 },
        { '日期': '2004-02-12', open: 10735.18, close: 10694.07, lowest: 10636.44, highest: 10775.03, vol: 197560000 },
        { '日期': '2004-02-13', open: 10696.22, close: 10627.85, lowest: 10578.66, highest: 10755.47, vol: 208340000 },
        { '日期': '2004-02-17', open: 10628.88, close: 10714.88, lowest: 10628.88, highest: 10762.07, vol: 169730000 },
        { '日期': '2004-02-18', open: 10706.68, close: 10671.99, lowest: 10623.62, highest: 10764.36, vol: 164370000 },
        { '日期': '2004-02-19', open: 10674.59, close: 10664.73, lowest: 10626.44, highest: 10794.95, vol: 219890000 },
        { '日期': '2004-02-20', open: 10666.29, close: 10619.03, lowest: 10559.11, highest: 10722.77, vol: 220560000 },
        { '日期': '2004-02-23', open: 10619.55, close: 10609.62, lowest: 10508.89, highest: 10711.84, vol: 229950000 },
        { '日期': '2004-02-24', open: 10609.55, close: 10566.37, lowest: 10479.33, highest: 10681.41, vol: 225670000 },
        { '日期': '2004-02-25', open: 10566.59, close: 10601.62, lowest: 10509.42, highest: 10660.73, vol: 192420000 },
        { '日期': '2004-02-26', open: 10598.14, close: 10580.14, lowest: 10493.71, highest: 10652.96, vol: 223230000 },
        { '日期': '2004-02-27', open: 10581.55, close: 10583.92, lowest: 10519.03, highest: 10689.55, vol: 200050000 }
      ]
    }
    this.candleSettings = {
      showMA: false,
      showVol: false,
      showDataZoom: false
    }
    this.pieTitle = {
      shou: true,
      text: '在同行中的占比',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
        height: 40,
        lineHeight: 40
      },
      padding: [14, 12, 0, 0]
    }
    this.pieData = {
      columns: ['银行', '份额', '占比'],
      rows: [
        { '银行': '中国银行', '份额': 123, '占比': 45 },
        { '银行': '招商银行', '份额': 1223, '占比': 20 },
        { '银行': '建设银行', '份额': 2123, '占比': 10 },
        { '银行': '交通银行', '份额': 4123, '占比': 13 },
        { '银行': '邮政银行', '份额': 3123, '占比': 15 },
        { '银行': '平安银行', '份额': 7123, '占比': 18 }
      ]
    }
    this.pieSettings = {
      dimension: '银行',
      metrics: '占比',
      label: false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.grid-content {
  margin-bottom: 12px;
  padding: 0 12px;
  width: 100%;
  background-color: $white;
  border-radius: 6px;
}
.meter-bar {
  .el-row {
    .el-col {
      position: relative;
    }
  }
}
@media only screen and (min-width: 768px) {
  .meter-bar {
    .el-row {
      .el-col {
        position: relative;
        &::before {
          position: absolute;
          top: 20px;
          right: 0;
          bottom: 20px;
          content: "";
          display: block;
          width: 1px;
          background-color: #ebeef5;
        }
        &:nth-of-type(2)::before,
        &:nth-of-type(4)::before,
        &:nth-of-type(6)::before {
          display: none;
        }
      }
    }
  }
}
@media only screen and (min-width: 992px) {
  .meter-bar {
    .el-row {
      .el-col {
        &:nth-of-type(2)::before{
          display: block;
        }
        &:nth-of-type(4)::before{
          display: block;
        }
        &:nth-of-type(3)::before{
          display: none;
        }
      }
    }
  }
}
@media only screen and (min-width: 1200px) {
  .meter-bar {
    .el-row {
      .el-col {
        &:nth-of-type(3)::before{
          display: block;
        }
      }
    }
  }
}
</style>
