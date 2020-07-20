<template>
    <div class="monitorStatisSummary content-box" style="height: 100%;">
        <h3 class="title">体质监测报告单汇总</h3>
        <Form class="clearfix search-form" inline label-position="left">
            <Row>
                <i-col span="22">
                    <FormItem label="学年" :label-width="40">
                        <i-select style="width:120px" v-model="req.year">
                            <Option value="-1">全部</Option>
                            <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="类型" :label-width="40" style="margin-right: 0!important;">
                        <i-select v-model="req.type" style="width:120px" @on-change="selectType">
                            <i-option :key="1" :value='1'>体质监测项目</i-option>
                            <i-option :key="2" :value='2'>派生指标</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="" :label-width="0" v-show="req.type===1">
                        <i-select v-model="req.project1" style="width:160px" :label-in-value="true"
                                  @on-change="select1Change">
                            <!--<i-option :value="-1">全部</i-option>-->
                            <i-option v-for="item of projectList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="" :label-width="0" v-show="req.type===2">
                        <i-select class="project2" v-model="req.project2" multiple :label-in-value="true"
                                  style="max-width:300px;max-height:34px;overflow-y: auto">
                            <!--<i-option :value="-1">全部</i-option>-->
                            <i-option :value="1">(体重/身高)*100</i-option>
                            <i-option :value="2">(体重/身高)*1000</i-option>
                            <i-option :value="3">(体重/身高^2)*10^4</i-option>
                            <i-option :value="4">(体重/身高^3)*10^7</i-option>
                            <i-option :value="5">体重-（身高-100）</i-option>
                            <i-option :value="6">(胸围/身高)*100</i-option>
                            <i-option :value="7">(体重+胸围)/身高*100</i-option>
                            <i-option :value="8">胸围-1/2身高</i-option>
                            <i-option :value="9">肺活量/体重</i-option>
                            <i-option :value="10">肺活量/身高</i-option>
                            <!--<i-option :value="11">肺活量/胸围</i-option>-->
                            <i-option :value="12">收缩压-舒张压</i-option>
                            <i-option :value="13">握力/身高</i-option>
                            <i-option :value="14">握力/体重</i-option>
                            <i-option :value="15">[(收缩压-舒张压)]/收缩压*100</i-option>
                            <i-option :value='16'>(体重*身高*引体向上*0.43)/100</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="区域" :label-width="40">
                        <i-select v-model="req.area_id" style="width:100px" @on-change="areaChange">
                            <!--<i-option :value="-1">全部</i-option>-->
                            <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        <i-select v-model="req.area_id2" style="width:100px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="学校" :label-width="40">
                        <i-select v-model="req.dep_id" filterable style="width:200px" :disabled="!is_manage">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="性别" :label-width="40">
                        <i-select v-model="req.gender" style="width:140px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option :value='1'>男</i-option>
                            <i-option :value='2'>女</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="年龄段" :label-width="54">
                        <i-select v-model="req.minAge" style="width:80px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option :value='6'>6</i-option>
                            <i-option :value='7'>7</i-option>
                            <i-option :value='8'>8</i-option>
                            <i-option :value='9'>9</i-option>
                            <i-option :value='10'>10</i-option>
                            <i-option :value='11'>11</i-option>
                            <i-option :value='12'>12</i-option>
                            <i-option :value='13'>13</i-option>
                            <i-option :value='14'>14</i-option>
                            <i-option :value='15'>15</i-option>
                            <i-option :value='16'>16</i-option>
                            <i-option :value='17'>17</i-option>
                            <i-option :value='18'>18</i-option>
                        </i-select>
                        -
                        <i-select v-model="req.maxAge" style="width:80px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option :value='6'>6</i-option>
                            <i-option :value='7'>7</i-option>
                            <i-option :value='8'>8</i-option>
                            <i-option :value='9'>9</i-option>
                            <i-option :value='10'>10</i-option>
                            <i-option :value='11'>11</i-option>
                            <i-option :value='12'>12</i-option>
                            <i-option :value='13'>13</i-option>
                            <i-option :value='14'>14</i-option>
                            <i-option :value='15'>15</i-option>
                            <i-option :value='16'>16</i-option>
                            <i-option :value='17'>17</i-option>
                            <i-option :value='18'>18</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="户籍类型" :label-width="70">
                        <i-select v-model="req.household_type" style="width:80px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option :value='1'>城市</i-option>
                            <i-option :value='2'>农村</i-option>
                        </i-select>
                    </FormItem>
                </i-col>
                <i-col span="2" style="text-align: right;">
                    <i-button class="searchBtn" type="primary" @click="search">统计</i-button>
                </i-col>
            </Row>
        </Form>
        <Divider dashed/>
        <div style="min-height: 36px;">
            <Row>
                <i-col span="3">
                    <div v-show="tableBtnFlag" class="add" @click="openModel">
                        <img src="../../../assets/common/reports.png" alt="生成报表"/>
                        生成报表
                    </div>
                </i-col>
                <i-col span="8" v-show="initsea">
                    <div v-show="req.type===1" style="padding-top: 6px;">
                        <CheckboxGroup v-model="select1" v-show="innerFlag === 1" @on-change="selectChange1">
                            <!--<span>人数&emsp;&emsp;</span>-->
                            <Checkbox label="平均值"></Checkbox>
                            <Checkbox label="标准差"></Checkbox>
                            <Checkbox label="成长分类" v-if="selectFlag"></Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup v-model="select2" v-show="innerFlag === 2" @on-change="selectChange1">
                            <!--<span>人数&emsp;&emsp;</span>-->
                            <Checkbox label="患龋失补牙数"></Checkbox>
                            <Checkbox label="患龋失补人数"></Checkbox>
                            <Checkbox label="龋患率"></Checkbox>
                            <Checkbox label="龋均"></Checkbox>
                        </CheckboxGroup>

                        <div v-show="innerFlag === 3">
                            <RadioGroup v-model="select3" @on-change="radioChange1">
                                <Radio label="以人为单位"></Radio>
                                <Radio label="以眼为单位"></Radio>
                            </RadioGroup>
                            <br>
                            <CheckboxGroup v-model="select4" @on-change="selectChange3">
                                <Checkbox label="视力低下检出率"></Checkbox>
                                <Checkbox label="近视检出率"></Checkbox>
                                <Checkbox label="平均视力"></Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                    <div v-show="req.type===2" style="padding-top: 6px;">
                        <CheckboxGroup v-model="der_select" @on-change="selectChange2">
                            <Checkbox label="平均值"></Checkbox>
                            <Checkbox label="标准差"></Checkbox>
                        </CheckboxGroup>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="chartWrapper" style="height: calc(100% - 260px);">
            <div ref="myChart" id="myChart" style="width: 100%;height: 100%;"></div>
        </div>

        <Modal
            title="体质监测报表"
            v-model="model"
            :width="1200"
            class="physicalReportInfo"
            :mask-closable="false"
        >
            <BaseTable center ref="table" :disabled-hover='true' border :columns="columns" :data="tableData"
                   style="margin-top: 20px"></BaseTable>
            <div slot="footer">
                <button type="button" class="co-btn confirm" @click='downLoad'>保存</button>
                <a href="#" id="exportExcel" style="display:none">导出excel</a>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import {area_all_list, getAllDep} from '@/api/basicData';

    import {todayYear, yearLists} from '@/libs/dateUtils';
    // 引入 ECharts 主模块
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // // 引入提示框和标题组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legendScroll');
    export default {
        name: 'monitorStatisSummary',
        data() {
            return {
                innerFlag: 1,
                initsea: false,
                loading: true,
                model: false,
                backupReq: {},
                req: {
                    year: todayYear(),
                    type: 1,
                    // project: "99AD89CA73F24EBFA1D3BD31A41AB42C",
                    project: 1,
                    area_id: '81D5B0F79E014C83E050007F010062EE',
                    area_id2: -1,
                    dep_id: -1,
                    gender: -1,
                    minAge: -1,
                    maxAge: -1,
                    household_type: -1,
                    project1: "99AD89CA73F24EBFA1D3BD31A41AB42C",
                    // project1: 1,
                    project2: []
                },
                // 表格表头渲染
                columns: [],
                //固定表头
                columns1: [
                    {
                        width: 80,
                        // fixed: 'left',
                        title: '户籍类型',
                        align: 'center',
                        key: 'household_type',
                        render: (h, params) => {
                            return h('span', null, params.row.household_type === 1 ? '城镇' : params.row.household_type === 2 ? '农村' : '全部');
                        }
                    },
                    {
                        minWidth: 140,
                        // fixed: 'left',
                        title: '区域',
                        align: 'center',
                        key: 'area_id',
                        render: (h, params) => {
                            return h('span', null, params.row.area_id ? params.row.area_id : '全部');
                        }
                    },
                    {
                        minWidth: 140,
                        // fixed: 'left',
                        title: '学校',
                        align: 'center',
                        key: 'school_id',
                        render: (h, params) => {
                            return h('span', null, params.row.school_id ? params.row.school_id : '全部');
                        }
                    },
                    {
                        width: 120,
                        // fixed: 'left',
                        title: '年级',
                        align: 'center',
                        key: 'garde_no',
                        render: (h, params) => {
                            return h('span', null, params.row.garde_no ? params.row.garde_no : '全部');
                        }
                    },
                    {
                        width: 100,
                        // fixed: 'left',
                        title: '班级',
                        align: 'center',
                        key: 'class_no',
                        render: (h, params) => {
                            return h('span', null, params.row.class_no ? params.row.class_no : '全部');
                        }
                    },
                    {
                        width: 100,
                        // fixed: 'left',
                        title: '年龄',
                        align: 'center',
                        key: 'age',
                        render: (h, params) => {
                            return h('span', null, params.row.age ? params.row.age : '全部');
                        }
                    },
                    {
                        title: '性别',
                        width: 70,
                        // fixed: 'left',
                        align: 'center',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : params.row.gender === 2 ? '女' : params.row.gender == null ? '全部' : params.row.gender);
                        }
                    },
                    {
                        title: '学生人数',
                        key: 'student_count',
                        width: 80,
                        align: 'center',
                        // fixed: 'left'
                    },
                    {
                        title: '实检人数',
                        width: 80,
                        align: 'center',
                        key: 'medical_count',
                        // fixed: 'left'
                    }

                ],
                column2: [
                    [
                        {
                            title: '生长迟缓',
                            align: 'center',
                            children: [
                                {
                                    title: '人数',
                                    align: 'center',
                                    width: 100,
                                    key: 'szch_count'
                                },
                                {
                                    title: '占受检%',
                                    align: 'center',
                                    width: 100,
                                    key: 'szch_count_ratio'
                                }
                            ]
                        },
                        {
                            title: '偏瘦',
                            align: 'center',
                            children: [
                                {
                                    title: '人数',
                                    align: 'center',
                                    width: 100,
                                    key: 'ps_count'
                                },
                                {
                                    title: '占受检%',
                                    align: 'center',
                                    width: 100,
                                    key: 'ps_count_ratio'
                                }
                            ]
                        },
                        {
                            title: '超重',
                            align: 'center',
                            children: [
                                {
                                    title: '人数',
                                    align: 'center',
                                    width: 100,
                                    key: 'cz_count'
                                },
                                {
                                    title: '占受检%',
                                    align: 'center',
                                    width: 100,
                                    key: 'cz_count_ratio'
                                }
                            ]
                        },
                        {
                            title: '肥胖',
                            align: 'center',
                            children: [
                                {
                                    title: '人数',
                                    align: 'center',
                                    width: 100,
                                    key: 'fp_count '
                                },
                                {
                                    title: '占受检%',
                                    align: 'center',
                                    width: 100,
                                    key: 'fp_count_ratio'
                                }
                            ]
                        }
                    ],
                    [
                        {
                            title: '收缩压',
                            align: 'center',
                            children: [
                                {
                                    title: '平均值',
                                    align: 'center',
                                    width: 100,
                                    key: 'spavg'
                                },
                                {
                                    title: '标准差',
                                    align: 'center',
                                    width: 100,
                                    key: 'spstddev'
                                }
                            ]
                        },
                        {
                            title: '舒张压',
                            align: 'center',
                            children: [
                                {
                                    title: '平均值',
                                    align: 'center',
                                    width: 100,
                                    key: 'dpavg'
                                },
                                {
                                    title: '标准差',
                                    align: 'center',
                                    width: 100,
                                    key: 'dpstddev'
                                }
                            ]
                        },
                        {
                            title: '脉搏',
                            align: 'center',
                            children: [
                                {
                                    title: '平均值',
                                    align: 'center',
                                    width: 100,
                                    key: 'pulseavg'
                                },
                                {
                                    title: '标准差',
                                    align: 'center',
                                    width: 100,
                                    key: 'pulsestddev'
                                }
                            ]
                        }
                    ],
                    [
                        {
                            title: '患龋失补牙数',
                            align: 'center',
                            children: [
                                {
                                    title: '龋患',
                                    align: 'center',
                                    width: 90,
                                    key: 'qh_threads'
                                },
                                {
                                    title: '龋失',
                                    align: 'center',
                                    width: 90,
                                    key: 'qs_threads'
                                },
                                {
                                    title: '龋补',
                                    align: 'center',
                                    width: 90,
                                    key: 'qb_threads'
                                }
                            ]
                        },
                        {
                            title: '患龋失补人数',
                            align: 'center',
                            children: [
                                {
                                    title: '龋患',
                                    align: 'center',
                                    width: 90,
                                    key: 'qh_people'
                                },
                                {
                                    title: '龋失',
                                    align: 'center',
                                    width: 90,
                                    key: 'qs_people'
                                },
                                {
                                    title: '龋补',
                                    align: 'center',
                                    width: 90,
                                    key: 'qb_people'
                                }
                            ]
                        },
                        {
                            title: '龋患率',
                            align: 'center',
                            width: 100,
                            key: 'prevalence_rate'
                        },
                        {
                            title: '龋均',
                            align: 'center',
                            width: 90,
                            key: 'dmft'
                        }
                    ],
                    [
                        {
                            title: '以人为单位',
                            align: 'center',
                            children: [
                                {
                                    title: '视力低下检出率',
                                    align: 'center',
                                    children: [
                                        {
                                            title: '轻度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_mild'
                                        },
                                        {
                                            title: '中度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_mezzo'
                                        },
                                        {
                                            title: '重度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_server '
                                        }
                                    ]
                                },
                                {
                                    title: '近视检出率',
                                    align: 'center',
                                    children: [
                                        {
                                            title: '轻度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_mild'
                                        },
                                        {
                                            title: '中度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_mezzo'
                                        },
                                        {
                                            title: '重度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_server'
                                        }
                                    ]
                                },
                                {
                                    title: '平均视力',
                                    align: 'center',
                                    width: 120,
                                    key: 'mean_eyesight'
                                }
                            ]
                        },
                        {
                            title: ' 以眼为单位',
                            align: 'center',
                            children: [
                                {
                                    title: '视力低下检出率',
                                    align: 'center',
                                    children: [
                                        {
                                            title: '轻度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_mild'
                                        },
                                        {
                                            title: '中度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_mezzo'
                                        },
                                        {
                                            title: '重度',
                                            align: 'center',
                                            width: 90,
                                            key: 'low_vision_server'
                                        }
                                    ]
                                },
                                {
                                    title: '近视检出率',
                                    align: 'center',
                                    children: [
                                        {
                                            title: '轻度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_mild'
                                        },
                                        {
                                            title: '中度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_mezzo'
                                        },
                                        {
                                            title: '重度',
                                            align: 'center',
                                            width: 90,
                                            key: 'myope_server'
                                        }
                                    ]
                                },
                                {
                                    title: '平均视力',
                                    align: 'center',
                                    width: 120,
                                    key: 'mean_eyesight'
                                }
                            ]
                        }
                    ]
                ],
                // 动态表头
                trendColumn: [
                    {
                        title: '身高',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'heightavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'heightstddv'
                            }
                        ]
                    },
                    {
                        title: '体重',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'weightavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'weightstddev'
                            }
                        ]
                    },
                    {
                        title: '胸围',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'chestavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'cheststddev'
                            }
                        ]
                    },
                    {
                        title: '肺活量',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'vitalavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'vitalstddv'
                            }
                        ]
                    },
                    {
                        title: '50米跑',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'runfiveavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'runfivrstddev'
                            }
                        ]
                    },
                    {
                        title: '立定跳远',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'standavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'standstddev'
                            }
                        ]
                    },
                    {
                        title: '斜身引体(男)',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'obliavg',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.obliavg);
                                    }
                                }
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'oblistddev',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.oblistddev);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '引体向上(男)',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'pullavg',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.pullavg);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'pullstddev',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.pullstddev);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '一分钟仰卧起坐(女)',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'sitavg',
                                render: (h, params) => {
                                    if (params.row.gender === 2) {
                                        return h('span', null, params.row.sitavg);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'sitstddev',
                                render: (h, params) => {
                                    if (params.row.gender === 2) {
                                        return h('span', null, params.row.sitstddev);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '握力',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'gripavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'gripstddev'
                            }
                        ]
                    },
                    {
                        title: '俯卧背起',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'backavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'backstddev'
                            }
                        ]
                    },
                    {
                        title: '坐位体前屈',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'bentavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'bentstddev'
                            }
                        ]
                    },
                    {
                        title: '50米*8往返跑',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'runbackavg'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'runbackstddev'
                            }
                        ]
                    },
                    {
                        title: '800米跑(女)',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'ehmavg',
                                render: (h, params) => {
                                    if (params.row.gender === 2) {
                                        return h('span', null, params.row.ehmavg);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'ehmstddev',
                                render: (h, params) => {
                                    if (params.row.gender === 2) {
                                        return h('span', null, params.row.ehmstddev);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '1000米跑(男)',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                width: 100,
                                key: 'othmavg',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.othmavg);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                width: 100,
                                key: 'othmstddev',
                                render: (h, params) => {
                                    if (params.row.gender === 1) {
                                        return h('span', null, params.row.othmstddev);
                                    } else {
                                        return h('span', null, '-');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '内科检查',
                        align: 'center',
                        key: 'nk',
                        // children: [
                        //     {
                        //         title: '平均值',
                        //         align: 'center',
                        //         width: 100,
                        //         key: 'body_nor_count'
                        //     },
                        //     {
                        //         title: '标准差',
                        //         align: 'center',
                        //         width: 100,
                        //         key: 'body_thin_count'
                        //     }
                        // ]
                    },

                    // {
                    //     title: '问卷调查',
                    //     align: 'center',
                    //     children: [
                    //         {
                    //             title: '平均值',
                    //             align: 'center',
                    //             width: 100,
                    //             key: 'body_nor_count'
                    //         },
                    //         {
                    //             title: '标准差',
                    //             align: 'center',
                    //             width: 100,
                    //             key: 'body_thin_count'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: '主检',
                    //     align: 'center',
                    //     children: [
                    //         {
                    //             title: '平均值',
                    //             align: 'center',
                    //             width: 100,
                    //             key: 'body_nor_count'
                    //         },
                    //         {
                    //             title: '标准差',
                    //             align: 'center',
                    //             width: 100,
                    //             key: 'body_thin_count'
                    //         }
                    //     ]
                    // }
                ],
                columns3: [
                    {
                        title: '(体重/身高)*100',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_one'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_one'
                            }
                        ]
                    },
                    {
                        title: '(体重/身高)*1000',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_two'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_two'
                            }
                        ]
                    },
                    {
                        title: '(体重/身高^2)*10^4',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_three'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_three'
                            }
                        ]
                    },
                    {
                        title: '(体重/身高^3)*10^7',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_four'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_four'
                            }
                        ]
                    },
                    {
                        title: '体重-（身高-100）',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_five'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_five'
                            }
                        ]
                    },
                    {
                        title: '(胸围/身高)*100',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_six'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_six'
                            }
                        ]
                    },
                    {
                        title: '(体重+胸围)/身高*100',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_seven'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_seven'
                            }
                        ]
                    },
                    {
                        title: '胸围-1/2身高',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_eight'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_eight'
                            }
                        ]
                    },
                    {
                        title: '肺活量/体重',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_nine'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_nine'
                            }
                        ]
                    },
                    {
                        title: '肺活量/身高',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_ten'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_ten'
                            }
                        ]
                    },
                    {
                        title: '肺活量/胸围',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_eleven'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_eleven'
                            }
                        ]
                    },
                    {
                        title: '收缩压-舒张压',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_twelve'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_twelve'
                            }
                        ]
                    },
                    {
                        title: '握力/身高',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_thirteen'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_thirteen'
                            }
                        ]
                    },
                    {
                        title: '握力/体重',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_fourteen'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_fourteen'
                            }
                        ]
                    },
                    {
                        title: '[(收缩压-舒张压)]/收缩压*100',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_fifteen'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_fifteen'
                            }
                        ]
                    },
                    {
                        title: '(体重*身高*引体向上*0.43)/100',
                        align: 'center',
                        children: [
                            {
                                title: '平均值',
                                align: 'center',
                                minWidth: 100,
                                key: 'ave_sixteen'
                            },
                            {
                                title: '标准差',
                                align: 'center',
                                minWidth: 100,
                                key: 'stddev_sixteen'
                            }
                        ]
                    }
                ],
                columns4: [
                    {
                        title: '以人为单位',
                        align: 'center',
                        children: [
                            {
                                title: '视力低下',
                                align: 'center',
                                children: [
                                    {
                                        title: '轻度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_mild'
                                    },
                                    {
                                        title: '中度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_mezzo'
                                    },
                                    {
                                        title: '重度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_server '
                                    }
                                ]
                            },
                            {
                                title: '近视',
                                align: 'center',
                                children: [
                                    {
                                        title: '轻度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_mild',
                                    },
                                    {
                                        title: '中度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_mezzo',
                                    },
                                    {
                                        title: '重度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_server',
                                    }
                                ]
                            },
                            {
                                title: '平均视力',
                                align: 'center',
                                width: 120,
                                key: 'mean_eyesight'
                            }
                        ]
                    },
                    {
                        title: ' 以眼为单位',
                        align: 'center',
                        children: [
                            {
                                title: '视力低下',
                                align: 'center',
                                children: [
                                    {
                                        title: '轻度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_mild',
                                    },
                                    {
                                        title: '中度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_mezzo',
                                    },
                                    {
                                        title: '重度',
                                        align: 'center',
                                        width: 90,
                                        key: 'low_vision_server',
                                    }
                                ]
                            },
                            {
                                title: '近视',
                                align: 'center',
                                children: [
                                    {
                                        title: '轻度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_mild',
                                    },
                                    {
                                        title: '中度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_mezzo',
                                    },
                                    {
                                        title: '重度',
                                        align: 'center',
                                        width: 90,
                                        key: 'myope_server',
                                    }
                                ]
                            },
                            {
                                title: '平均视力',
                                align: 'center',
                                width: 120,
                                key: 'mean_eyesight'
                            }
                        ]
                    }
                ],
                // 表格数据
                tableData: [],
                areaList: [],
                areaList1: [],
                projectList: [
                    {
                        id: '8EE7B19DFAC74C7E898E983785800A0A',
                        name: '一般'
                    },
                    {
                        id: '17A4564A4AC04DF5AA5DA0DA486BC2B0',
                        name: '胸围'
                    },
                    {
                        id: '974DEF00FADE480EA8640D09048A1EAA',
                        name: '肺活量'
                    },
                    {
                        id: '8e185be85aa84a69894d33bc80aee4dc',
                        name: '生理功能'
                    },
                    {
                        id: 'EB8008CA3A4748A7A3A803EB250EAE4F',
                        name: '视力'
                    },
                    {
                        id: '11C5EB39EBA34971ABE9C2109A91E508',
                        name: '口腔'
                    }
                ],
                bodys: [
                    {
                        name: '生长迟缓',
                        key: 'szch_count'
                    },
                    {
                        name: '偏瘦',
                        key: 'ps_count'
                    },
                    {
                        name: '超重',
                        key: 'cz_count'
                    },
                    {
                        name: '肥胖',
                        key: 'fp_count'
                    }
                ],
                schoolList: [],
                gradeList: [],
                classList: [],
                yearList: [],
                downloadLoading: false,
                tableBtnFlag: false,
                // exportData:[],
                myChart: null,
                is_manage: true,
                data_back: '[]', // 数据备份
                select1: ['平均值', '标准差', '成长分类'],
                select2: ['患龋失补牙数', '患龋失补人数', '龋患率', '龋均'],
                select3: '以人为单位',
                select4: ['视力低下检出率', '近视检出率', '平均视力'],
                select_1: ['平均值', '标准差', '成长分类'],
                select_back: ['平均值', '标准差'],
                selectFlag: true,
                der_select: ['平均值', '标准差']
            };
        },
        methods: {
            selectType(value) {
                this.initsea = false;
            },
            radioChange1() {
                this.select4 = ['视力低下检出率', '近视检出率', '平均视力'];
                this.search();
            },
            selectChange3() { // 视力
                if (this.myChart) {
                    this.myChart.dispose();
                    this.myChart = null;
                }
                let data = JSON.parse(this.data_back);
                this.myChart = echarts.init(this.$refs.myChart);
                let opt = {};
                if (this.select3 === '以人为单位') {
                    opt = this.dealBody4(data, 0);
                } else if (this.select3 === '以眼为单位') {
                    opt = this.dealBody4(data, 1);
                }

                this.drawLine(opt);
            },
            select1Change(value) {
                this.initsea = false;
                const project1 = value.value;
                switch (project1) {
                    case "8EE7B19DFAC74C7E898E983785800A0A": // 一般
                        this.innerFlag = 1;
                        this.selectFlag = true;
                        this.select1 = this.select_1.slice();
                        break;
                    case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                        this.innerFlag = 1;
                        this.selectFlag = false;
                        this.select1 = this.select_back.slice();
                        break;
                    case '8e185be85aa84a69894d33bc80aee4dc': // 生理功能
                        this.selectFlag = false;
                        this.select1 = this.select_back.slice();
                        break;
                    case '974DEF00FADE480EA8640D09048A1EAA':   // 肺活量
                    case 'D4E320F6A79943DEA051909FCB9A333A':   // 50米跑
                    case '3C3FE6DE526A40E9A9C767D52DAB3DBA':   // 立定跳远
                    case '8CED5936B1B149D185C1817C79C25CC7':   // 斜身引体(男)
                    case '00406BBF634F46F18AAD2BACC20848CD':   // 引体向上(男)
                    case '440FAFF92A244067BFF66F93535CD40C':   // 一分钟仰卧起坐(女)
                    case 'BBEFE6B76E5A4F7FAF613C8F1821230D':   // 握力
                    case '9B07CA9871F3448EAD9D5B65FA8F0DC9':   // 50米*8往返跑
                    case '61565E92B26B4DC9A1A58D4F22A26664':   // 800米跑(女)
                    case '4E43940DD0D2452DA021B8DF02AA1FD4':   // 1000米跑(男)
                    case 'EECD8F0D74C34C1DB05BF5588F44C63D':   // 坐位体前屈
                    case 'C3B16749490B4FB6936FCE6ADC584239':   // 内科检查
                    case '7701F78D1DFB4D83AE4072FC87C4BE96':   // 俯卧背起
                    case '76CAF3BCA30D4E6D9193654AB41C2D55':   // 问卷调查
                    case '4CB1D6E85926467392DC1E194032AAF9':   // 主检
                    case '2AA7456DA01A484AA99391FF79745030':   // 屈光度
                        this.innerFlag = 1;
                        this.selectFlag = false;
                        this.select1 = this.select_back.slice();
                        break;
                    case '11C5EB39EBA34971ABE9C2109A91E508':   // 口腔
                        this.innerFlag = 2;
                        this.selectFlag = false;
                        this.select2 = this.select2.slice();
                        break;
                    case 'EB8008CA3A4748A7A3A803EB250EAE4F': // 视力
                        this.selectFlag = false;
                        this.innerFlag = 3;
                        this.select3 = '以人为单位';
                        this.select4 = ['视力低下检出率', '近视检出率', '平均视力'];
                        break;
                    default:
                        this.innerFlag = 1;
                        this.selectFlag = false;
                        this.select1 = this.select_back.slice();
                        break;
                }
            },
            selectChange1(value) {
                this.select1 = value;
                if (this.myChart) {
                    this.myChart.dispose();
                    this.myChart = null;
                }
                this.myChart = echarts.init(this.$refs.myChart);
                this.selectDealFunction();
            },
            selectChange2(value) {
                if (this.myChart) {
                    this.myChart.dispose();
                    this.myChart = null;
                }
                this.myChart = echarts.init(this.$refs.myChart);
                this.selectDealFunction();
                // opt = this.dealData(data);
                this.drawLine(opt);
            },
            selectDealFunction(){
                let data = JSON.parse(this.data_back);
                let opt = {};
                let project1 = this.req.project1;
                switch (project1) {
                    case "8EE7B19DFAC74C7E898E983785800A0A": // 一般
                        opt = this.dealBody(data, 0);
                        break;
                    case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                        opt = this.dealBody2(data, 2);
                        break;
                    case '8e185be85aa84a69894d33bc80aee4dc': // 生理功能
                        opt = this.dealBody1(data, 1);
                        break;
                    case '974DEF00FADE480EA8640D09048A1EAA':   // 肺活量
                        opt = this.dealBody2(data, 3);
                        break;
                    case 'D4E320F6A79943DEA051909FCB9A333A':   // 50米跑
                        opt = this.dealBody2(data, 4);
                        break;
                    case '3C3FE6DE526A40E9A9C767D52DAB3DBA':   // 立定跳远
                        opt = this.dealBody2(data, 5);
                        break;
                    case '8CED5936B1B149D185C1817C79C25CC7':   // 斜身引体(男)
                        opt = this.dealBody2(data, 6);
                        break;
                    case '00406BBF634F46F18AAD2BACC20848CD':   // 引体向上(男)
                        opt = this.dealBody2(data, 7);
                        break;
                    case '440FAFF92A244067BFF66F93535CD40C':   // 一分钟仰卧起坐(女)
                        opt = this.dealBody2(data, 8);
                        break;
                    case 'BBEFE6B76E5A4F7FAF613C8F1821230D':   // 握力
                        opt = this.dealBody2(data, 9);
                        break;
                    case '7701F78D1DFB4D83AE4072FC87C4BE96':   // 俯卧背起
                        opt = this.dealBody2(data, 10);
                        break;
                    case 'EECD8F0D74C34C1DB05BF5588F44C63D':   // 坐位体前屈
                        opt = this.dealBody2(data, 11);
                        break;
                    case '9B07CA9871F3448EAD9D5B65FA8F0DC9':   // 50米*8往返跑
                        opt = this.dealBody2(data, 12);
                        break;
                    case '61565E92B26B4DC9A1A58D4F22A26664':   // 800米跑(女)
                        opt = this.dealBody2(data, 13);
                        break;
                    case '4E43940DD0D2452DA021B8DF02AA1FD4':   // 1000米跑(男)
                        opt = this.dealBody2(data, 14);
                        break;
                    case 'C3B16749490B4FB6936FCE6ADC584239':   // 内科检查
                        opt = this.dealBody2(data, 4);
                        break;
                    case '76CAF3BCA30D4E6D9193654AB41C2D55':   // 问卷调查
                        opt = this.dealBody2(data, 4);
                        break;
                    case '4CB1D6E85926467392DC1E194032AAF9':   // 主检
                        opt = this.dealBody2(data, 4);
                        break;
                    case '2AA7456DA01A484AA99391FF79745030':   // 屈光度
                        opt = this.dealBody2(data, 4);
                        break;
                    case '11C5EB39EBA34971ABE9C2109A91E508':   // 口腔
                        opt = this.dealBody3(data, 2);
                        break;
                    default:
                        opt = {};
                        break;
                }
                this.drawLine(opt);
            },
            // 下拉菜单列表
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                Promise.all([
                    getAllDep(),  // 学校
                    area_all_list()// 区域1
                ]).then(([value1, value2]) => {
                    let data1 = value1.data || [];
                    this.schoolList = data1.filter((item) => item.type === 2);

                    let data2 = value2.data || [];
                    this.areaList = data2.filter((item) => item.type === 2);

                    this.areaChange(this.req.area_id);
                });

                this.$ajax({ // 监测项目
                    url: urls.monitorTeam_set_name,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data
                    } else {
                        this.projectList = []
                    }
                }).catch(err => {

                });
            },
            // 区域变化
            areaChange(value) {
                this.tableBtnFlag = false;
                this.req.area_id2 = -1;
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {
                        pid: value
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter((item) => {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },

            tableBtnShow(v) {
                this.tableBtnFlag = false;
            },
            // 下载报表
            downLoad() {
                let that = this;
                method1();
                let idTmr;

                function getExplorer() {
                    var explorer = window.navigator.userAgent;
                    //ie
                    if (explorer.indexOf('MSIE') >= 0) {
                        return 'ie';
                    }
                    //firefox
                    else if (explorer.indexOf('Firefox') >= 0) {
                        return 'Firefox';
                    }
                    //Chrome
                    else if (explorer.indexOf('Chrome') >= 0) {
                        return 'Chrome';
                    }
                    //Opera
                    else if (explorer.indexOf('Opera') >= 0) {
                        return 'Opera';
                    }
                    //Safari
                    else if (explorer.indexOf('Safari') >= 0) {
                        return 'Safari';
                    }
                }

                function tableToExcel(de) {
                    var uri = 'data:application/vnd.ms-excel;base64,',
                        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>',
                        base64 = function (s) {
                            return window.btoa(unescape(encodeURIComponent(s)));
                        },
                        format = function (s, c) {
                            return s.replace(/{(\w+)}/g,
                                function (m, p) {
                                    return c[p];
                                });
                        };

                    function ll(table, name) {
                        if (!table.nodeType) table = document.getElementById(table);
                        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
                        var items = document.getElementsByClassName('ivu-table-tip')[0].innerHTML;
                        ctx.table = ctx.table.replace(items, '');
                        document.getElementById('exportExcel').href = uri + base64(format(template, ctx));
                        document.getElementById('exportExcel').download = '汇总报表' + '.xls';//自定义文件名
                        document.getElementById('exportExcel').click();
                    }

                    ll(de);
                }

                function method1() {//整个表格拷贝到EXCEL中
                    if (getExplorer() === 'ie') {
                        var curTbl = that.$refs.table.querySelector('.ivu-table');
                        var oXL = new ActiveXObject('Excel.Application');

                        //创建AX对象excel
                        var oWB = oXL.Workbooks.Add();
                        //获取workbook对象
                        var xlsheet = oWB.Worksheets(1);
                        //激活当前sheet
                        var sel = document.body.createTextRange();
                        sel.moveToElementText(curTbl);
                        //把表格中的内容移到TextRange中
                        sel.select();
                        //全选TextRange中内容
                        sel.execCommand('Copy');
                        //复制TextRange中内容
                        xlsheet.Paste();
                        //粘贴到活动的EXCEL中
                        oXL.Visible = true;
                        //设置excel可见属性

                        try {
                            var fname = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls');
                        } catch (e) {
                            print('Nested catch caught ' + e);
                        } finally {
                            oWB.SaveAs(fname);

                            oWB.Close(savechanges = false);
                            //xls.visible = false;
                            oXL.Quit();
                            oXL = null;
                            //结束excel进程，退出完成
                            //window.setInterval("Cleanup();",1);
                            idTmr = window.setInterval('Cleanup();', 1);

                        }

                    } else {
                        tableToExcel(that.$refs.table.$el.querySelector('.ivu-table'));
                    }
                }

                // this.$refs.table.exportCsv({
                //     filename: 'The original data'
                // });
                // this.downloadLoading = true

            },
            // 生成报表
            openModel() {
                if (this.req.type === 2) {
                    this.generatorTable2();
                    this.model = true;
                    return false;
                }
                let project1 = this.req.project1;
                switch (project1) {
                    case -1:
                        this.columns = [...this.columns1, ...this.trendColumn];
                        break;
                    case "8EE7B19DFAC74C7E898E983785800A0A": // 一般
                        this.columns = [...this.columns1, ...this.trendColumn.slice(0, 2), ...this.column2.slice(0, 1)[0]];
                        break;
                    case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                        this.columns = [...this.columns1, ...this.trendColumn.slice(2, 3)];
                        break;
                    case '8e185be85aa84a69894d33bc80aee4dc': // 生理功能
                        this.columns = [...this.columns1, ...this.column2.slice(1, 2)[0]];
                        break;
                    case '974DEF00FADE480EA8640D09048A1EAA':   // 肺活量
                        this.columns = [...this.columns1, ...this.trendColumn.slice(3, 4)];
                        break;
                    case 'D4E320F6A79943DEA051909FCB9A333A':   // 50米跑
                        this.columns = [...this.columns1, ...this.trendColumn.slice(4, 5)];
                        break;
                    case '3C3FE6DE526A40E9A9C767D52DAB3DBA':   // 立定跳远
                        this.columns = [...this.columns1, ...this.trendColumn.slice(5, 6)];
                        break;
                    case '8CED5936B1B149D185C1817C79C25CC7':   // 斜身引体(男)
                        this.columns = [...this.columns1, ...this.trendColumn.slice(6, 7)];
                        break;
                    case '00406BBF634F46F18AAD2BACC20848CD':   // 引体向上(男)
                        this.columns = [...this.columns1, ...this.trendColumn.slice(7, 8)];
                        break;
                    case '440FAFF92A244067BFF66F93535CD40C':   // 一分钟仰卧起坐(女)
                        this.columns = [...this.columns1, ...this.trendColumn.slice(8, 9)];
                        break;
                    case 'BBEFE6B76E5A4F7FAF613C8F1821230D':   // 握力
                        this.columns = [...this.columns1, ...this.trendColumn.slice(9, 10)];
                        break;
                    case '7701F78D1DFB4D83AE4072FC87C4BE96':   // 俯卧背起
                        this.columns = [...this.columns1, ...this.trendColumn.slice(10, 11)];
                        break;
                    case 'EECD8F0D74C34C1DB05BF5588F44C63D':   // 坐位体前屈
                        this.columns = [...this.columns1, ...this.trendColumn.slice(11, 12)];
                        break;
                    case '9B07CA9871F3448EAD9D5B65FA8F0DC9':   // 50米*8往返跑
                        this.columns = [...this.columns1, ...this.trendColumn.slice(12, 13)];
                        break;
                    case '61565E92B26B4DC9A1A58D4F22A26664':   // 800米跑(女)
                        this.columns = [...this.columns1, ...this.trendColumn.slice(13, 14)];
                        break;
                    case '4E43940DD0D2452DA021B8DF02AA1FD4':   // 1000米跑(男)
                        this.columns = [...this.columns1, ...this.trendColumn.slice(14, 15)];
                        break;
                    case 'C3B16749490B4FB6936FCE6ADC584239':   // 内科检查
                        this.columns = [...this.columns1, ...this.trendColumn.slice(15, 16)];
                        break;
                    case '76CAF3BCA30D4E6D9193654AB41C2D55':   // 问卷调查
                        this.columns = [...this.columns1, ...this.trendColumn.slice(18, 19)];
                        break;
                    case '4CB1D6E85926467392DC1E194032AAF9':   // 主检
                        this.columns = [...this.columns1, ...this.trendColumn.slice(19, 20)];
                        break;
                    case '2AA7456DA01A484AA99391FF79745030':   // 屈光度
                        this.columns = [...this.columns1, ...this.trendColumn.slice(19, 20)];
                        break;
                    case '11C5EB39EBA34971ABE9C2109A91E508':   // 口腔
                        this.columns = [...this.columns1, ...this.column2.slice(2, 3)[0]];
                        break;
                    case 'EB8008CA3A4748A7A3A803EB250EAE4F':  // 视力
                        this.columns = [...this.columns1, ...this.column2.slice(3, 4)[0]];
                        break;
                    default:
                        break;
                }
                this.getSummaryData(JSON.parse(this.data_back));
                this.model = true;
            },
            generatorTable2() {
                if (!this.der_select.length) {
                    this.columns = [];
                } else if (this.der_select.length === 2) {
                    let temp = this.req.project2;
                    if (!temp.length) {
                        this.columns = [...this.columns1, ...this.columns3];
                    } else {
                        let t = temp.map(item => this.columns3[item - 1]);
                        this.columns = [...this.columns1, ...t];
                    }
                } else {
                    let temp = this.req.project2;
                    let label = this.der_select[0];
                    if (!temp.length) {
                        let te = this.columns3.map(item => {
                            return {
                                title: item.title,
                                align: 'center',
                                children: item.children.filter(dw => dw.title === label)
                            };
                        });
                        this.columns = [...this.columns1, ...te];
                    } else {
                        let t = temp.map(item => this.columns3[item - 1]);
                        let label = this.der_select[0];
                        let te = t.map(item => {
                            return {
                                title: item.title,
                                align: 'center',
                                children: item.children.filter(dw => dw.title === label)
                            };
                        });
                        this.columns = [...this.columns1, ...te];
                    }
                }
            },
            getAyesData(req) {
                this.$ajax({
                    url: urls.monitor_eye,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        let json = data.data || [];
                        this.data_back = JSON.stringify(json);
                        if (this.myChart) {
                            this.myChart.dispose();
                            this.myChart = null;
                        }
                        this.myChart = echarts.init(this.$refs.myChart);
                        let opt = {};
                        if (this.select3 === '以人为单位') {
                            opt = this.dealBody4(json, 0);
                        } else if (this.select3 === '以眼为单位') {
                            opt = this.dealBody4(json, 1);
                        }
                        this.drawLine(opt);
                    }
                });
            },
            search() {
                if (this.req.minAge !== -1 && this.req.maxAge !== -1) {
                    if (Number(this.req.minAge) > Number(this.req.maxAge)) {
                        this.$Message.error('最小年龄不能大于最大年龄');
                        return false;
                    }
                }
                const {type,year, project1, area_id, area_id2, household_type, dep_id, gender, minAge, maxAge} = this.req;

                this.tableBtnFlag = true;

                let url = '';
                let req = {
                    'year': year === '-1' ? null : year,
                    // 'physicalName': project1 === -1 ? null : project1,
                    'area_pid': area_id === -1 ? null : area_id,
                    'area_id': area_id2 === -1 ? null : area_id2,
                    'household_type': household_type === -1 ? null : household_type,
                    'school_id': dep_id === -1 ? null : dep_id,
                    'gender': gender === -1 ? 0 :gender,
                    'agestar': minAge === -1 ? 0 : minAge,
                    'ageend': maxAge === -1 ? 19 : minAge
                };


                this.initsea = true;
                if (type === 1 && project1 === 'EB8008CA3A4748A7A3A803EB250EAE4F' && this.innerFlag === 3) { // 调用视力函数
                    if (this.select3 === '以人为单位') {
                        req.unit = 1;
                    } else if (this.select3 === '以眼为单位') {
                        req.unit = 2;
                    }
                    this.getAyesData(req);
                    return;
                }

                if (type === 1) { // 基本项
                    switch (project1) {
                        case "8EE7B19DFAC74C7E898E983785800A0A": // 一般
                            url = urls.all_monitor_data;
                            break;
                        case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                            url = urls.shengli;
                            break;
                        case '8e185be85aa84a69894d33bc80aee4dc': // 生理功能
                            url = urls.shengli;
                            break;
                        case '974DEF00FADE480EA8640D09048A1EAA':   // 肺活量
                            url = urls.shengli;
                            break;
                        case 'D4E320F6A79943DEA051909FCB9A333A':   // 50米跑
                            url = urls.shengli;
                            break;
                        case '3C3FE6DE526A40E9A9C767D52DAB3DBA':   // 立定跳远
                            url = urls.shengli;
                            break;
                        case '8CED5936B1B149D185C1817C79C25CC7':   // 斜身引体(男)
                            url = urls.shengli;
                            break;
                        case '00406BBF634F46F18AAD2BACC20848CD':   // 引体向上(男)
                            url = urls.shengli;
                            break;
                        case '440FAFF92A244067BFF66F93535CD40C':   // 一分钟仰卧起坐(女)
                            url = urls.shengli;
                            break;
                        case 'BBEFE6B76E5A4F7FAF613C8F1821230D':   // 握力
                            url = urls.shengli;
                            break;
                        case '9B07CA9871F3448EAD9D5B65FA8F0DC9':   // 50米*8往返跑
                            url = urls.shengli;
                            break;
                        case '61565E92B26B4DC9A1A58D4F22A26664':   // 800米跑(女)
                            url = urls.shengli;
                            break;
                        case '4E43940DD0D2452DA021B8DF02AA1FD4':   // 1000米跑(男)
                            url = urls.shengli;
                            break;
                        case 'EECD8F0D74C34C1DB05BF5588F44C63D':   // 坐位体前屈
                            url = urls.shengli;
                            break;
                        case 'C3B16749490B4FB6936FCE6ADC584239':   // 内科检查
                            url = urls.shengli;
                            break;
                        case '7701F78D1DFB4D83AE4072FC87C4BE96':   // 俯卧背起
                            url = urls.shengli;
                            break;
                        case '76CAF3BCA30D4E6D9193654AB41C2D55':   // 问卷调查
                            url = urls.shengli;
                            break;
                        case '4CB1D6E85926467392DC1E194032AAF9':   // 主检
                            url = urls.shengli;
                            break;
                        case '2AA7456DA01A484AA99391FF79745030':   // 屈光度
                            url = urls.shengli;
                            break;
                        case '11C5EB39EBA34971ABE9C2109A91E508':   // 口腔
                            url = urls.monitor_kou;
                            break;
                        default:
                            url = urls.all_monitor_data;
                    }

                } else { // 派生项
                    url = urls.all_der_data;
                    req = {
                        'year': year === '-1' ? null : year,
                        'area_pid': area_id === -1 ? null : area_id,
                        'area_id': area_id2 === -1 ? null : area_id2,
                        'household_type': household_type === -1 ? null : household_type,
                        'dep_id': dep_id === -1 ? null : dep_id,
                        'gender': gender === -1 ? 0 : gender,
                        'agestar': minAge === -1 ? 0 : minAge,
                        'ageend': maxAge === -1 ? 19 : minAge
                    };
                }
                this.$ajax({
                    url: url,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        let json = data.data || [];
                        this.data_back = JSON.stringify(json);
                        if (this.myChart) {
                            this.myChart.dispose();
                            this.myChart = null;
                        }
                        this.myChart = echarts.init(this.$refs.myChart);
                        let opt = {};
                        if (this.req.type === 1) { // 基本项
                            this.selectDealFunction();
                        } else {
                            opt = this.dealData(json);
                        }

                        this.drawLine(opt);
                    }
                });

            },
            getLegend(index) {
                return this.trendColumn.slice(index, index + 1)[0].children.map(item => item.title);
            },
            dealData(data) {
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.school_name);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.school_name);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.area_name);
                        } else {
                            gradeTemp = data.map(item => item.area_name);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let project = this.req.project2.slice();
                let lengend = [];
                let series = [];
                if (!project.length) {

                    this.columns3.forEach(item => {
                        item.children.forEach(item2 => {
                            let singleLen = item.title + '(' + item2.title + ')';
                            if (this.der_select.includes(item2.title)) {
                                lengend.push(singleLen);
                                let field = item2.key;
                                let temp_data = data.map(d => d[field]);
                                series.push({
                                    name: singleLen,
                                    type: 'bar',
                                    data: temp_data
                                });
                            }
                        });
                    });
                } else {
                    project.map(item => {
                        let children = this.columns3[item - 1];
                        children.children.map(item2 => {
                            let singleLen = children.title + '(' + item2.title + ')';
                            if (this.der_select.includes(item2.title)) {
                                lengend.push(singleLen);
                                let field = item2.key;
                                let temp_data = data.map(d => d[field]);
                                series.push({
                                    name: singleLen,
                                    type: 'bar',
                                    data: temp_data
                                });
                            }
                        });
                    });
                }
                return {
                    legend: {
                        type: 'scroll',
                        left: 160,
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            dealBody(data, index) { /// 形体
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.schoolId);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.schoolId);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.areaId);
                        } else {
                            gradeTemp = data.map(item => item.areaId);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let lengend = [];
                let series = [];

                this.trendColumn.slice(0, 2).forEach(item => {
                    let children = item.children || [];
                    children.forEach(inner => {
                        if (this.select1.includes(inner.title)) {
                            let singleLen = item.title + '(' + inner.title + ')';
                            lengend.push(singleLen);
                            let arr = data.map(data1 => {
                                let child = data1.monReportDatas || [];
                                return child.reduce((init1, next) => {
                                    return init1 + next[inner.key];
                                }, 0);
                            });
                            series.push({
                                name: singleLen,
                                type: 'bar',
                                data: arr
                            });
                        }
                    });
                });
                if (this.select1.includes('成长分类')) {
                    this.bodys.forEach(item => {
                        lengend.push(item.name);
                        let arr = data.map(data1 => {
                            let child = data1.monReportDatas || [];
                            return child.reduce((init1, next) => {
                                return init1 + next[item.key];
                            }, 0);
                        });
                        series.push({
                            name: item.name,
                            type: 'bar',
                            data: arr
                        });
                    });
                }

                return {
                    legend: {
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            dealBody1(data, index) { // 生理功能
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.schoolId);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.schoolId);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.areaId);
                        } else {
                            gradeTemp = data.map(item => item.areaId);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let lengend = [];
                let series = [];

                this.column2.slice(index, index + 1)[0].forEach(item => {
                    let children = item.children || [];
                    children.forEach(inner => {
                        if (this.select1.includes(inner.title)) {
                            let singleLen = item.title + '(' + inner.title + ')';
                            lengend.push(singleLen);
                            let arr = data.map(data1 => {
                                let child = data1.monReportDatas || [];
                                return child.reduce((init1, next) => {
                                    return init1 + next[inner.key];
                                }, 0);
                            });
                            series.push({
                                name: singleLen,
                                type: 'bar',
                                data: arr
                            });
                        }
                    });
                });

                return {
                    legend: {
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            dealBody2(data, index) {// 肺活量// 胸围
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.schoolId);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.schoolId);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.areaId);
                        } else {
                            gradeTemp = data.map(item => item.areaId);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let lengend = [];
                let series = [];

                this.trendColumn.slice(index, index + 1).forEach(item => {
                    let children = item.children || [];
                    children.forEach(inner => {
                        if (this.select1.includes(inner.title)) {
                            let singleLen = item.title + '(' + inner.title + ')';
                            lengend.push(singleLen);
                            let arr = data.map(data1 => {
                                let child = data1.monReportDatas || [];
                                return child.reduce((init1, next) => {
                                    return init1 + next[inner.key];
                                }, 0);
                            });
                            series.push({
                                name: singleLen,
                                type: 'bar',
                                data: arr
                            });
                        }
                    });
                });

                return {
                    legend: {
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            dealBody3(data, index) {
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.schoolId);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.schoolId);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.areaId);
                        } else {
                            gradeTemp = data.map(item => item.areaId);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let lengend = [];
                let series = [];

                this.column2.slice(index, index + 1)[0].forEach(item => {
                    let children = item.children || [];
                    if (this.select2.includes(item.title)) {
                        if (children.length) {
                            children.forEach(inner => {
                                let singleLen = item.title + '(' + inner.title + ')';
                                lengend.push(singleLen);
                                let arr = data.map(data1 => {
                                    let child = data1.mouthData || [];
                                    return child.reduce((init1, next) => {
                                        return init1 + next[inner.key];
                                    }, 0);
                                });
                                series.push({
                                    name: singleLen,
                                    type: 'bar',
                                    data: arr
                                });

                            });
                        } else {
                            let singleLen = item.title;
                            lengend.push(singleLen);
                            let arr = data.map(data1 => {
                                let child = data1.mouthData || [];
                                return child.reduce((init1, next) => {
                                    return init1 + next[item.key];
                                }, 0);
                            });
                            series.push({
                                name: singleLen,
                                type: 'bar',
                                data: arr
                            });
                        }
                    }
                });

                return {
                    legend: {
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            dealBody4(data, index) {
                let gradeTemp = [];
                if (this.req.dep_id !== -1) {
                    gradeTemp = data.map(item => item.schoolId);
                } else {
                    if (this.req.area_id2 !== -1) {
                        gradeTemp = data.map(item => item.schoolId);
                    } else {
                        if (this.req.area_id !== -1) {
                            gradeTemp = data.map(item => item.areaId);
                        } else {
                            gradeTemp = data.map(item => item.areaId);
                        }
                    }
                }

                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                /* ============ y 轴 ========== end  */

                let lengend = [];
                let series = [];

                this.columns4.slice(index, index + 1)[0].children.forEach(item => {
                    let all = '';
                    if (item.title === '视力低下' || item.title === '近视') {
                        all = item.title + '检出率';
                    } else {
                        all = item.title;
                    }

                    let children = item.children || [];
                    if (children.length) {
                        children.forEach(inner => {

                            if (this.select4.includes(all)) {
                                let singleLen = item.title + '(' + inner.title + ')';
                                lengend.push(singleLen);
                                let arr = data.map(data1 => {
                                    let child = data1.monEyesData || [];
                                    return child.reduce((init1, next) => {
                                        return init1 + next[inner.key];
                                    }, 0);
                                });
                                series.push({
                                    name: singleLen,
                                    type: 'bar',
                                    data: arr
                                });
                            }
                        });
                    } else {
                        if (this.select4.includes(all)) {
                            let singleLen = item.title;
                            lengend.push(singleLen);
                            let arr = data.map(data1 => {
                                let child = data1.monEyesData || [];
                                return child.reduce((init1, next) => {
                                    return init1 + next[item.key];
                                }, 0);
                            });
                            series.push({
                                name: singleLen,
                                type: 'bar',
                                data: arr
                            });
                        }
                    }
                });

                return {
                    legend: {
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let v = params[i].value ? params[i].value : 0;
                                let val1 = Number(v);
                                let val2 = 100 * Number(v);
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                };
            },
            deal(data, label1, label2, label3, label4) {
                let sw = [[], [], [], []];
                data.map(item => {
                    let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0, d7 = 0, d8 = 0;
                    if (item.resultStaminaReportData) {

                        if (item.resultStaminaReportData[0]) {
                            d1 = item.resultStaminaReportData[0][label1 + '_count'] || 0;
                            d2 = item.resultStaminaReportData[0][label2 + '_count'] || 0;
                            d3 = item.resultStaminaReportData[0][label3 + '_count'] || 0;
                            d4 = item.resultStaminaReportData[0][label4 + '_count'] || 0;
                        }

                        if (item.resultStaminaReportData[1]) {
                            d5 = item.resultStaminaReportData[1][label1 + '_count'] || 0;
                            d6 = item.resultStaminaReportData[1][label2 + '_count'] || 0;
                            d7 = item.resultStaminaReportData[1][label3 + '_count'] || 0;
                            d8 = item.resultStaminaReportData[1][label4 + '_count'] || 0;

                        }
                    }
                    sw[0].push(d1 + d5);
                    sw[1].push(d2 + d6);
                    sw[2].push(d3 + d7);
                    sw[3].push(d4 + d8);
                });
                return sw;
            },

            drawData(lengend, xa, ya, series){
                return {
                    legend: {
                        type: 'scroll',
                        left: 160,
                        right: 40,
                        top: 20,
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let relVal = `${params[0].name}`;
                            let value = 0;
                            for (let i = 0, l = params.length; i < l; i++) {
                                let v = params[i].value ? Number(params[i].value) : 0;
                                value += v;
                            }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value ? Number(params[i].value) : 0;
                                // let val1 = params[i].value;
                                let val2 = 100 * val1;
                                let all = val2 / value;
                                relVal += `<div>${params[i].seriesName} ${val1} </div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    calculable: true
                }
            },
            // 统计堆叠图
            drawLine(opt) {
                // 绘制图表
                this.myChart.setOption(opt);
            },
            //获取统计数据
            getSummaryData(data) {
                let tempArr = [];
                if (this.req.type === 1) {
                    let project1 = this.req.project1;
                    switch (project1) {
                        case "8EE7B19DFAC74C7E898E983785800A0A": // 一般
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '8e185be85aa84a69894d33bc80aee4dc': // 生理功能
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '974DEF00FADE480EA8640D09048A1EAA':   // 肺活量
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case 'D4E320F6A79943DEA051909FCB9A333A':   // 50米跑
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '3C3FE6DE526A40E9A9C767D52DAB3DBA':   // 立定跳远
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '8CED5936B1B149D185C1817C79C25CC7':   // 斜身引体(男)
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '00406BBF634F46F18AAD2BACC20848CD':   // 引体向上(男)
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '440FAFF92A244067BFF66F93535CD40C':   // 一分钟仰卧起坐(女)
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case 'BBEFE6B76E5A4F7FAF613C8F1821230D':   // 握力
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '7701F78D1DFB4D83AE4072FC87C4BE96':   // 俯卧背起
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case 'EECD8F0D74C34C1DB05BF5588F44C63D':   // 坐位体前屈
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '9B07CA9871F3448EAD9D5B65FA8F0DC9':   // 50米*8往返跑
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '61565E92B26B4DC9A1A58D4F22A26664':   // 800米跑(女)
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '4E43940DD0D2452DA021B8DF02AA1FD4':   // 1000米跑(男)
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case 'C3B16749490B4FB6936FCE6ADC584239':   // 内科检查
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '76CAF3BCA30D4E6D9193654AB41C2D55':   // 问卷调查
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '4CB1D6E85926467392DC1E194032AAF9':   // 主检
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '2AA7456DA01A484AA99391FF79745030':   // 屈光度
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        case '11C5EB39EBA34971ABE9C2109A91E508':   // 口腔
                            data.forEach(item => {
                                if (item.mouthData && Array.isArray(item.mouthData)) {
                                    tempArr.push(...item.mouthData);
                                }
                            });
                            break;
                        case 'EB8008CA3A4748A7A3A803EB250EAE4F':  // 视力
                            data.forEach(item => {
                                if (item.monReportDatas && Array.isArray(item.monReportDatas)) {
                                    tempArr.push(...item.monReportDatas);
                                }
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    tempArr = data;
                }
                this.tableData = tempArr;
            }
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') { // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.yearList = yearLists().reverse();
            this.getSelectCondition();
        },
        mounted() {
            if (!this.myChart) {
                this.myChart = echarts.init(this.$refs.myChart);
            }
            let that = this;
            window.onresize = () => {
                that.myChart.resize();
            };
        },
        beforeDestroy() {
            // 销毁图表
            window.onresize = null;
            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
            }
        }
    };
</script>

<style lang="less">
    .monitorStatisSummary {
        .ivu-form-item-label {
            padding: 9px 4px 7px 0 !important;
        }

        .ivu-form .ivu-form-item {
            margin-right: 20px !important;
            margin-bottom: 10px !important;
        }

        .disabled span {
            color: #ccc;
        }

        .chartWrapper {
            width: 90%;
            margin: auto;
        }

        .project2 .ivu-select-selection div {
            max-height: 30px;
        }
    }

    .autoWidth.ivu-select {
        width: auto;
    }
</style>

