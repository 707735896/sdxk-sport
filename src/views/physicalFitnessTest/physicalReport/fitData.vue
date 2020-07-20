<template>
    <div class="fitData content-box" style="height: 100%;">
        <h3 class="title">体能测试报告单汇总</h3>
        <Form class="clearfix" inline label-position="left">
            <Row>
                <i-col span="22">
                    <FormItem label="学年" :label-width="40">
                        <i-select v-model="req.year" style="width:120px" @on-change="tableBtnShow">
                            <!--<i-option :value="-1">全部</i-option>-->
                            <i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="项目" :label-width="40">
                        <i-select v-model="req.project" style="width:120px">
                            <!--<i-option :value="-1">全部</i-option>-->
                            <i-option v-for="item of projectList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="区域" :label-width="40">
                        <i-select v-model="req.area_id" style="width:100px" @on-change="areaChange">
                            <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        <i-select v-model="req.area_id2" style="width:100px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="学校名称" :label-width="70">
                        <i-select v-model="req.dep_id" filterable style="width:200px" @on-change="schoolChange"
                                  :disabled="!is_manage">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="年级" :label-width="40">
                        <i-select v-model="req.grade_no" style="width:140px" @on-change="gradeChange">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="班级" :label-width="40">
                        <i-select v-model="req.class_no" style="width:140px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}
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
                            <i-option :value="19">全部</i-option>
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
                </i-col>
                <i-col span="2">
                    <i-button class="searchBtn" size="small" type="primary" @click="search">统计</i-button>
                </i-col>
            </Row>
        </Form>
        <Divider dashed/>
        <div style="height: 36px;">
            <div v-show="tableBtnFlag" class="add" @click="openModel">
                <img src="../../../assets/common/reports.png" alt="生成报表"/>
                生成报表
            </div>
        </div>
        <div class="chartWrapper" style="height: calc(100% - 260px);">
            <div ref="myChart" id="myChart"></div>
        </div>

        <Modal
            title="体能测试报表"
            v-model="model"
            :width="1200"
            class="physicalReportInfo"
            :mask-closable="false"
        >
            <BaseTable center ref="table" :disabled-hover='true' border :columns="columns" :data="tableData"></BaseTable>
            <div slot="footer">
                <button type="button" class="co-btn confirm" @click='downLoad'>保存</button>
                <a href="#" id="exportExcel" style="display:none">导出excel</a>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    let count_map = new Map();
    // 引入 ECharts 主模块
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        name: 'fitData',
        data() {
            return {
                loading: true,
                model: false,
                req: {
                    year: todayYear(),
                    project: '3012F15D7AEF474CB5E0CFF83671FAC5',
                    // project: -1,
                    area_id: '81D5B0F79E014C83E050007F010062EE',
                    area_id2: -1,
                    dep_id: -1,
                    grade_no: -1,
                    class_no: -1,
                    gender: -1,
                    minAge: -1,
                    maxAge: 19
                },
                // 表格表头渲染
                columns: [],
                //固定表头
                columns1: [
                    // {
                    //     minWidth: 140,
                    //     title: '户籍类型',
                    //     align: 'center',
                    //     key: 'household_type',
                    //     render: (h, params) => {
                    //         if (params.row.household_type == 1) {
                    //             return h('span', null, '城镇');
                    //         } else if (params.row.household_type == 2) {
                    //             return h('span', null, '农村');
                    //         }
                    //         return h('span', null, '');
                    //     }
                    // },
                    {
                        minWidth: 140,
                        title: '区域',
                        align: 'center',
                        key: 'area_id',
                        render: (h, params) => {
                            return h('span', null, params.row.area_id ? params.row.area_id : '全部');
                        }
                    },
                    {
                        minWidth: 140,
                        title: '学校',
                        align: 'center',
                        key: 'school_id',
                        render: (h, params) => {
                            return h('span', null, params.row.school_id ? params.row.school_id : '全部');
                        }
                    },
                    {
                        width: 120,
                        title: '年级',
                        align: 'center',
                        key: 'garde_no',
                        render: (h, params) => {
                            return h('span', null, params.row.garde_no ? params.row.garde_no : '全部');
                        }
                    },
                    {
                        width: 100,
                        title: '班级',
                        align: 'center',
                        key: 'class_no',
                        render: (h, params) => {
                            return h('span', null, params.row.class_no ? params.row.class_no : '全部');
                        }
                    },
                    {
                        width: 100,
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
                        align: 'center'
                    },
                    {
                        title: '实检人数',
                        width: 80,
                        align: 'center',
                        key: 'medical_count'
                    }

                ],
                // 动态表头
                trendColumn: [
                    {
                        title: '一般',
                        align: 'center',
                        children: [
                            {
                                title: '正常',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_nor_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_nor_proportion'
                                }
                                ]
                            },
                            {
                                title: '偏瘦',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_thin_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_thin_proportion'
                                }
                                ]
                            },
                            {
                                title: '超重',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_over_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_over_proportion'
                                }
                                ]
                            },
                            {
                                title: '肥胖',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_fat_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'body_fat_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '握力',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'grip_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '坐位体前屈',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'reach_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '俯卧背起',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'szch_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '立定跳远',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'stanl_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '斜身引体',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'taper_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '引体向上',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'chin_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '仰卧起坐',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'uptodo_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '一分钟跳绳',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'skip_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '50米跑',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'fiftym_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '50米*8往返跑',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'bfifty_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '800米跑',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'eh_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '1000米跑',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_exc_cont'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'onet_exc_proportion'
                                }
                                ]
                            }
                        ]
                    },
                    {
                        title: '肺活量',
                        align: 'center',
                        children: [
                            {
                                title: '及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_pass_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_pass_proportion'
                                }
                                ]
                            },
                            {
                                title: '不及格',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_fail_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_fail_proportion'
                                }
                                ]
                            },
                            {
                                title: '良好',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_well_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_well_proportion'
                                }
                                ]
                            },
                            {
                                title: '优秀',
                                align: 'center',
                                children: [{
                                    title: '人数',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_exc_count'
                                }, {
                                    title: '占受检%',
                                    width: 90,
                                    align: 'center',
                                    key: 'pul_exc_proportion'
                                }
                                ]
                            }
                        ]
                    }
                ],
                // 表格数据
                tableData: [],
                yearList: [],
                areaList: [],
                areaList1: [],
                projectList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                downloadLoading: false,
                tableBtnFlag: false,
                // exportData:[],
                myChart: null,
                is_manage: true,
                tmp: []
            };
        },
        methods: {
            tableBtnShow(v) {
                this.tableBtnFlag = false;
            },
            // 下载报表
            downLoad() {
                let that = this;
                method1();
                var idTmr;

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
                        document.getElementById('exportExcel').download = '体能测试报告单汇总' + '.xls';//自定义文件名
                        document.getElementById('exportExcel').click();
                    }

                    ll(de);
                }

                function method1() {//整个表格拷贝到EXCEL中
                    if (getExplorer() == 'ie') {
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
            },
            // 生成报表
            openModel() {
                // this.getSummaryData()
                if (this.req.project === -1) {
                    this.columns = [...this.columns1, ...this.trendColumn];
                } else if (this.req.project === '3012F15D7AEF474CB5E0CFF83671FAC5') { // BMI
                    this.columns = [...this.columns1, ...this.trendColumn.slice(0, 1)];
                } else if (this.req.project === 'B2F6CDB8BC704A0A9F280C5CDA8D0019') { // 握力
                    this.columns = [...this.columns1, ...this.trendColumn.slice(1, 2)];
                } else if (this.req.project === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                    this.columns = [...this.columns1, ...this.trendColumn.slice(2, 3)];
                } else if (this.req.project === 'F657424A586743F891E5D7010301E204') { // 俯卧背起
                    this.columns = [...this.columns1, ...this.trendColumn.slice(3, 4)];
                } else if (this.req.project === 'D241DD6A528F47BE9E75308A74E0EADD') { // 立定跳远
                    this.columns = [...this.columns1, ...this.trendColumn.slice(4, 5)];
                } else if (this.req.project === '5A7FE87B74714954B649427C8BF31D56') { // 斜身引体
                    this.columns = [...this.columns1, ...this.trendColumn.slice(5, 6)];
                } else if (this.req.project === '88ED8DA7E639489ABEF0306951A8BDC9') { // 引体向上
                    this.columns = [...this.columns1, ...this.trendColumn.slice(6, 7)];
                } else if (this.req.project === '1CFEB456E8744B9E9AA42B2BAAF57A4D') { // 仰卧起坐
                    this.columns = [...this.columns1, ...this.trendColumn.slice(7, 8)];
                } else if (this.req.project === '257B4D2B6D934C24A880891207795B2A') { // 一分钟跳绳
                    this.columns = [...this.columns1, ...this.trendColumn.slice(8, 9)];
                } else if (this.req.project === '1E0C72B68D8947E894399EFE598F9DC3') { // 50米跑
                    this.columns = [...this.columns1, ...this.trendColumn.slice(9, 10)];
                } else if (this.req.project === 'AF32A3AEB7C4466CB3A170D0348E16A3') { // 50米*8往返跑
                    this.columns = [...this.columns1, ...this.trendColumn.slice(12, 11)];
                } else if (this.req.project === '6E40F3C06491405AAEBBCDB39FB43AD2') { // 800米跑
                    this.columns = [...this.columns1, ...this.trendColumn.slice(11, 12)];
                } else if (this.req.project === '84940DA547A944FEB7935D28D52A5803') { // 1000米跑
                    this.columns = [...this.columns1, ...this.trendColumn.slice(12, 13)];
                } else if (this.req.project === '2793ED8F812A4928B220D5DA2A7F489C') { //肺活量
                    this.columns = [...this.columns1, ...this.trendColumn.slice(13, 14)];
                }
                this.model = true;
            },
            // 下拉菜单列表
            getSelectCondition() {
                this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);
                            if (!this.is_manage) {
                                this.schoolChange(sessionStorage.getItem('dep_id'));
                            }
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });

                this.$ajax({ // 体测项目
                    url: urls.elecPhysical_Para_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                    } else {
                        this.projectList = [];
                    }
                }).catch(err => {

                });

                this.$ajax({ // 区域1
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 2);
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
                // 区域2
                this.areaChange(this.req.area_id);
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
                        this.areaList1 = data.data.filter((item) => item.type === 3 && item.pid === value);
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            // 选择学校
            schoolChange(value) {
                this.tableBtnFlag = false;
                this.req.grade_no = -1;
                if (value === -1) {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                this.$ajax({
                    url: urls.grade_no_list,
                    data: {
                        garde: temp[0].nature
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            // 选择年级
            gradeChange(value) {
                this.tableBtnFlag = false;
                this.req.class_no = -1;
                if (value === -1) {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: value,
                        dep_id: this.req.dep_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            search() {
                if (Number(this.req.minAge) > Number(this.req.maxAge)) {
                    this.$Message.error('最小年龄不能大于最大年龄');
                    return false;
                }
                this.getSummaryData({
                    data: []
                });
                this.tableBtnFlag = true;
                const {year, project, area_id, area_id2, dep_id, grade_no, class_no, gender, minAge, maxAge} = this.req;
                let req = {
                    'year': year,
                    'physicalName': project === -1 ? null : project,
                    'area_pid': area_id === -1 ? null : area_id,
                    'area_id': area_id2 === -1 ? null : area_id2,
                    'school_id': dep_id === -1 ? null : dep_id,
                    'garde_no': grade_no === -1 ? null : grade_no,
                    'class_no': class_no === -1 ? null : class_no,
                    'gender': gender === -1 ? 0 : gender,
                    'agestar': minAge === -1 ? 0 : minAge,
                    'ageend': maxAge
                };
                this.$ajax({
                    url: urls.fit_chart,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        this.getSummaryData(data);
                        if (this.myChart) {
                            this.myChart.dispose();
                            this.myChart = null;
                        }
                        this.myChart = echarts.init(this.$refs.myChart);
                        let opt = {};
                        // // 处理数据 ----start-------
                        // if (req.grade_no && req.class_no) {
                        //     opt = this.dealdata1(); // 选择班级，只显示一个班级
                        // } else if (req.grade_no && !req.class_no) {
                        //     opt = this.dealdata2(); // 不选班级，选择年级 ，显示一个年级
                        // } else {
                        //     opt = this.dealdata3(data.data); // 显示所有年级
                        // }
                        // // 处理数据 ----end-------
                        opt = this.dealData3(data.data); // 显示所有年级
                        this.drawLine(opt);
                    }
                });
            },
            getLegend(index) {
                return this.trendColumn.slice(index, index + 1)[0].children.map(item => item.title);
            },
            dealData3(data) {
                let gradeTemp = [];
                if (this.req.grade_no !== -1) {
                    gradeTemp = data.map(item => item.garde_no ? item.garde_no : '全部');
                } else {
                    if (this.req.dep_id !== -1) {
                        gradeTemp = data.map(item => item.garde_no ? item.garde_no : '全部');
                    } else {
                        if (this.req.area_id2 !== -1) {
                            gradeTemp = data.map(item => item.schoolId ? item.schoolId : '全部');
                        } else {
                            if (this.req.area_id !== -1) {
                                gradeTemp = data.map(item => item.areaId ? item.areaId : '全部');
                            } else {
                                gradeTemp = data.map(item => item.areaId ? item.areaId : '全部');
                            }
                        }
                    }
                }
                this.tmp = gradeTemp.slice();
                /* ============ x 轴 ========== start  */
                let xa = [{ // x 轴
                    type: 'category',
                    data: gradeTemp.slice()
                }];
                /* ============ x 轴 ========== end  */

                /* ============ y 轴 ========== start  */
                let ya = [];
                if (this.req.project === -1) {
                    ya = [{  // y 轴
                        name: '全部',
                        type: 'value'
                    }];
                } else {
                    ya = [{  // y 轴
                        name: this.projectList.filter(({id}) => id === this.req.project).map(({name}) => name)[0],
                        type: 'value'
                    }];
                }

                /* ============ y 轴 ========== end  */

                let lengend = [];
                if (this.req.project === -1) {
                    lengend = this.projectList.slice();
                } else {
                    if (this.req.project === '3012F15D7AEF474CB5E0CFF83671FAC5') { // BMI
                        lengend = this.getLegend(0);
                    } else if (this.req.project === 'B2F6CDB8BC704A0A9F280C5CDA8D0019') { // 握力
                        lengend = this.getLegend(1);
                    } else if (this.req.project === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                        lengend = this.getLegend(2);
                    } else if (this.req.project === 'F657424A586743F891E5D7010301E204') { // 俯卧背起
                        lengend = this.getLegend(3);
                    } else if (this.req.project === 'D241DD6A528F47BE9E75308A74E0EADD') { // 立定跳远
                        lengend = this.getLegend(4);
                    } else if (this.req.project === '5A7FE87B74714954B649427C8BF31D56') { // 斜身引体
                        lengend = this.getLegend(5);
                    } else if (this.req.project === '88ED8DA7E639489ABEF0306951A8BDC9') { // 引体向上
                        lengend = this.getLegend(6);
                    } else if (this.req.project === '1CFEB456E8744B9E9AA42B2BAAF57A4D') { // 仰卧起坐
                        lengend = this.getLegend(7);
                    } else if (this.req.project === '257B4D2B6D934C24A880891207795B2A') { // 一分钟跳绳
                        lengend = this.getLegend(8);
                    } else if (this.req.project === '1E0C72B68D8947E894399EFE598F9DC3') { // 50米跑
                        lengend = this.getLegend(9);
                    } else if (this.req.project === 'AF32A3AEB7C4466CB3A170D0348E16A3') { // 50米*8往返跑
                        lengend = this.getLegend(10);
                    } else if (this.req.project === '6E40F3C06491405AAEBBCDB39FB43AD2') { // 800米跑
                        lengend = this.getLegend(11);
                    } else if (this.req.project === '84940DA547A944FEB7935D28D52A5803') { // 1000米跑
                        lengend = this.getLegend(12);
                    } else if (this.req.project === '2793ED8F812A4928B220D5DA2A7F489C') { //肺活量
                        lengend = this.getLegend(13);
                    }

                }
                let project = [];
                if (this.req.project === -1) {
                    project = this.projectList.slice();
                } else {
                    project = this.projectList.filter(({id}) => id === this.req.project);
                }
                let series = [];
                project.map((inneritem, index) => {
                    let sw = [[], [], [], []];
                    if (inneritem.id === '3012F15D7AEF474CB5E0CFF83671FAC5') { // BMI
                        sw = this.deal(data, 'body_nor_count', 'body_thin_count', 'body_over_count', 'body_fat_count');
                    } else if (inneritem.id === 'B2F6CDB8BC704A0A9F280C5CDA8D0019') { // 握力
                        sw = this.deal(data, 'grip_pass_count', 'grip_fail_count', 'grip_well_count', 'grip_exc_count');
                    } else if (inneritem.id === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                        sw = this.deal(data, 'reach_pass_count', 'reach_fail_count', 'reach_well_count', 'reach_exc_count');
                    } else if (inneritem.id === 'F657424A586743F891E5D7010301E204') { // 俯卧背起
                        sw = this.deal(data, 'szch_pass_count', 'szch_fail_count', 'szch_well_count', 'szch_exc_count');
                    } else if (inneritem.id === 'D241DD6A528F47BE9E75308A74E0EADD') { // 立定跳远
                        sw = this.deal(data, 'stanl_pass_count', 'stanl_fail_count', 'stanl_well_count', 'stanl_exc_count');
                    } else if (inneritem.id === '5A7FE87B74714954B649427C8BF31D56') { // 斜身引体
                        sw = this.deal(data, 'taper_pass_count', 'taper_fail_count', 'taper_well_count', 'taper_exc_count');
                    } else if (inneritem.id === '88ED8DA7E639489ABEF0306951A8BDC9') { // 引体向上
                        sw = this.deal(data, 'chin_pass_count', 'chin_fail_count', 'chin_well_count', 'chin_exc_count');
                    } else if (inneritem.id === '1CFEB456E8744B9E9AA42B2BAAF57A4D') { // 仰卧起坐
                        sw = this.deal(data, 'uptodo_pass_count', 'uptodo_fail_count', 'uptodo_well_count', 'uptodo_exc_count');
                    } else if (inneritem.id === '257B4D2B6D934C24A880891207795B2A') { // 一分钟跳绳
                        sw = this.deal(data, 'skip_pass_count', 'skip_fail_count', 'skip_well_count', 'skip_exc_count');
                    } else if (inneritem.id === '1E0C72B68D8947E894399EFE598F9DC3') { // 50米跑
                        sw = this.deal(data, 'fiftym_pass_count', 'fiftym_fail_count', 'fiftym_well_count', 'fiftym_exc_count');
                    } else if (inneritem.id === 'AF32A3AEB7C4466CB3A170D0348E16A3') { // 50米*8往返跑
                        sw = this.deal(data, 'bfifty_pass_count', 'bfifty_fail_count', 'bfifty_well_count', 'bfifty_exc_count');
                    } else if (inneritem.id === '6E40F3C06491405AAEBBCDB39FB43AD2') { // 800米跑
                        sw = this.deal(data, 'eh_pass_count', 'eh_fail_count', 'eh_well_count', 'eh_exc_count');
                    } else if (inneritem.id === '84940DA547A944FEB7935D28D52A5803') { // 1000米跑
                        sw = this.deal(data, 'onet_pass_count', 'onet_fail_count', 'onet_well_count', 'onet_exc_cont');
                    } else if (inneritem.id === '2793ED8F812A4928B220D5DA2A7F489C') { //肺活量
                        sw = this.deal(data, 'pul_pass_count', 'pul_fail_count', 'pul_well_count', 'pul_exc_count');
                    }

                    series.push({
                        name: lengend[0],
                        type: 'bar',
                        // stack: inneritem.name,
                        data: sw[0]
                    }, {
                        name: lengend[1],
                        type: 'bar',
                        // stack: inneritem.name,
                        data: sw[1]
                    }, {
                        name: lengend[2],
                        type: 'bar',
                        // stack: inneritem.name,
                        data: sw[2]
                    }, {
                        name: lengend[3],
                        type: 'bar',
                        // stack: inneritem.name,
                        data: sw[3]
                    });
                });
                return {
                    legend: {
                        data: lengend
                    },
                    xAxis: xa.slice(),
                    yAxis: ya.slice(),
                    series: series.slice(),
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let count = count_map.get(params[0].name);
                            let relVal = `${params[0].name}`;
                            // let value = 0;
                            // for (let i = 0, l = params.length; i < l; i++) {
                            //     value += Number(params[i].value);
                            // }

                            for (let i = 0, l = params.length; i < l; i++) {
                                // let gender = i % 2 === 0 ? '男' : '女';
                                let val1 = params[i].value?params[i].value:0;
                                let val2 = 100 * Number(val1);
                                let all = val2 / count;
                                relVal += `<div>${params[i].seriesName} 学生数：${val1} <br/>占比例:${all ? all.toFixed(2) : 0}%</div>`;
                            }
                            return relVal;
                        },
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }
                    },
                    // color: ['#51C8CB', '#526F99', '#F5C4C7', '#EAC688', '#66C4DD', '#E79387', '#5B95A2'],
                    calculable: true
                };
            },
            deal(data, label1, label2, label3, label4) {
                count_map.clear();
                let sw = [[], [], [], []];
                data.map((item, index) => {
                    let all = {
                        d1: 0,
                        d2: 0,
                        d3: 0,
                        d4: 0
                    };
                    let obj = {
                        d1: 0,
                        d2: 0,
                        d3: 0,
                        d4: 0
                    };
                    count_map.set(this.tmp[index], 0);
                    if (item.resultStaminaReportData) {
                        let count = 0;
                        obj = item.resultStaminaReportData.reduce((inits, cur) => {
                            let co = cur.medical_count ? cur.medical_count : 0;
                            count += co;
                            return {
                                d1: cur[label1] ? inits['d1'] + cur[label1] : inits['d1'],
                                d2: cur[label2] ? inits['d2'] + cur[label2] : inits['d2'],
                                d3: cur[label3] ? inits['d3'] + cur[label3] : inits['d3'],
                                d4: cur[label4] ? inits['d4'] + cur[label4] : inits['d4']
                            };
                        }, all);
                        count_map.set(this.tmp[index], count);
                    }
                    sw[0].push(obj['d1']);
                    sw[1].push(obj['d2']);
                    sw[2].push(obj['d3']);
                    sw[3].push(obj['d4']);
                });
                return sw;
            },
            // 统计堆叠图
            drawLine(opt) {
                // 绘制图表
                this.myChart.setOption(opt);
            },
            //获取统计数据
            getSummaryData(data) {
                let {sex, class_name, grade_name, school_name, area_name} = data;
                let tempArr = [];
                let allTotal = {
                    'age': null,
                    'class_no': class_name,
                    'garde_no': grade_name,
                    'term': null,
                    'school_id': school_name,
                    'area_id': area_name,
                    'gender': '总计',
                    // "household_type": 2,
                    'taper_fail_count': 0,
                    'taper_fail_proportion': 0,
                    'taper_pass_count': 0,
                    'taper_pass_proportion': 0,
                    'taper_well_count': 0,
                    'taper_well_proportion': 0,
                    'taper_exc_count': 0,
                    'taper_exc_proportion': 0,
                    'grip_fail_count': 0,
                    'grip_fail_proportion': 0,
                    'grip_pass_count': 0,
                    'grip_pass_proportion': 0,
                    'grip_well_count': 0,
                    'grip_well_proportion': 100,
                    'grip_exc_count': 0,
                    'grip_exc_proportion': 0,
                    'stanl_fail_count': 0,
                    'stanl_fail_proportion': 0,
                    'stanl_pass_count': 0,
                    'stanl_pass_proportion': 0,
                    'stanl_well_count': 0,
                    'stanl_well_proportion': 0,
                    'stanl_exc_count': 0,
                    'stanl_exc_proportion': 0,
                    'uptodo_fail_count': 0,
                    'uptodo_fail_proportion': 0,
                    'uptodo_pass_count': 0,
                    'uptodo_pass_proportion': 0,
                    'uptodo_well_count': 0,
                    'uptodo_well_proportion': 0,
                    'uptodo_exc_count': 0,
                    'uptodo_exc_proportion': 0,
                    'onet_fail_count': 0,
                    'onet_fail_proportion': 0,
                    'onet_pass_count': 0,
                    'onet_pass_proportion': 0,
                    'onet_well_count': 0,
                    'onet_well_proportion': 0,
                    'onet_exc_cont': 0,
                    'onet_exc_proportion': 0,
                    'eh_fail_count': 0,
                    'eh_fail_proportion': 0,
                    'eh_pass_count': 0,
                    'eh_pass_proportion': 0,
                    'eh_well_count': 0,
                    'eh_well_proportion': 0,
                    'eh_exc_count': 0,
                    'eh_exc_proportion': 0,
                    'bfifty_fail_count': 0,
                    'bfifty_fail_proportion': 0,
                    'bfifty_pass_count': 0,
                    'bfifty_pass_proportion': 0,
                    'bfifty_well_count': 0,
                    'bfifty_well_proportion': 0,
                    'bfifty_exc_count': 0,
                    'bfifty_exc_proportion': 0,
                    'fiftym_fail_count': 0,
                    'fiftym_fail_proportion': 0,
                    'fiftym_pass_count': 0,
                    'fiftym_pass_proportion': 0,
                    'fiftym_well_count': 0,
                    'fiftym_well_proportion': 0,
                    'fiftym_exc_count': 0,
                    'fiftym_exc_proportion': 0,
                    'chin_fail_count': 0,
                    'chin_fail_proportion': 0,
                    'chin_pass_count': 0,
                    'chin_pass_proportion': 0,
                    'chin_well_count': 0,
                    'chin_well_proportion': 0,
                    'chin_exc_count': 0,
                    'chin_exc_proportion': 0,
                    'skip_fail_count': 0,
                    'skip_fail_proportion': 0,
                    'skip_pass_count': 0,
                    'skip_pass_proportion': 0,
                    'skip_well_count': 0,
                    'skip_well_proportion': 0,
                    'skip_exc_count': 1,
                    'skip_exc_proportion': 0,
                    'reach_fail_count': 0,
                    'reach_fail_proportion': 0,
                    'reach_pass_count': 0,
                    'reach_pass_proportion': 0,
                    'reach_well_count': 0,
                    'reach_well_proportion': 0,
                    'reach_exc_count': 0,
                    'reach_exc_proportion': 0,
                    'pul_fail_count': 0,
                    'pul_fail_proportion': 0,
                    'pul_pass_count': 0,
                    'pul_pass_proportion': 0,
                    'pul_well_count': 0,
                    'pul_well_proportion': 0,
                    'pul_exc_count': 0,
                    'pul_exc_proportion': 0,
                    'body_fat_count': 0,
                    'body_fat_proportion': 0,
                    'body_over_count': 0,
                    'body_over_proportion': 0,
                    'body_thin_count': 0,
                    'body_thin_proportion': 0,
                    'body_nor_count': 0,
                    'body_nor_proportion': 0,
                    'medical_count': 0,
                    'student_count': 0,
                    'medical_type': null
                };
                data.data.forEach(item => {
                    let subtotal = {
                        'age': null,
                        'gender': '小计',
                        'class_no': item.class_no,
                        'garde_no': item.class_no,
                        'school_id': item.schoolId,
                        'area_id': item.areaId,
                        'household_type': 0,
                        'medical_type': null,
                        'taper_fail_count': 0,
                        'taper_fail_proportion': 0,
                        'taper_pass_count': 0,
                        'taper_pass_proportion': 0,
                        'taper_well_count': 0,
                        'taper_well_proportion': 0,
                        'taper_exc_count': 0,
                        'taper_exc_proportion': 0,
                        'grip_fail_count': 0,
                        'grip_fail_proportion': 0,
                        'grip_pass_count': 0,
                        'grip_pass_proportion': 0,
                        'grip_well_count': 0,
                        'grip_well_proportion': 0,
                        'grip_exc_count': 0,
                        'grip_exc_proportion': 0,
                        'stanl_fail_count': 0,
                        'stanl_fail_proportion': 0,
                        'stanl_pass_count': 0,
                        'stanl_pass_proportion': 0,
                        'stanl_well_count': 0,
                        'stanl_well_proportion': 0,
                        'stanl_exc_count': 0,
                        'stanl_exc_proportion': 0,
                        'uptodo_fail_count': 0,
                        'uptodo_fail_proportion': 0,
                        'uptodo_pass_count': 0,
                        'uptodo_pass_proportion': 0,
                        'uptodo_well_count': 0,
                        'uptodo_well_proportion': 0,
                        'uptodo_exc_count': 0,
                        'uptodo_exc_proportion': 0,
                        'onet_fail_count': 0,
                        'onet_fail_proportion': 0,
                        'onet_pass_count': 0,
                        'onet_pass_proportion': 0,
                        'onet_well_count': 0,
                        'onet_well_proportion': 0,
                        'onet_exc_cont': 0,
                        'onet_exc_proportion': 0,
                        'eh_fail_count': 0,
                        'eh_fail_proportion': 0,
                        'eh_pass_count': 0,
                        'eh_pass_proportion': 0,
                        'eh_well_count': 0,
                        'eh_well_proportion': 0,
                        'eh_exc_count': 0,
                        'eh_exc_proportion': 0,
                        'bfifty_fail_count': 0,
                        'bfifty_fail_proportion': 0,
                        'bfifty_pass_count': 0,
                        'bfifty_pass_proportion': 0,
                        'bfifty_well_count': 0,
                        'bfifty_well_proportion': 0,
                        'bfifty_exc_count': 0,
                        'bfifty_exc_proportion': 0,
                        'fiftym_fail_count': 0,
                        'fiftym_fail_proportion': 0,
                        'fiftym_pass_count': 0,
                        'fiftym_pass_proportion': 0,
                        'fiftym_well_count': 0,
                        'fiftym_well_proportion': 0,
                        'fiftym_exc_count': 0,
                        'fiftym_exc_proportion': 0,
                        'chin_fail_count': 0,
                        'chin_fail_proportion': 0,
                        'chin_pass_count': 0,
                        'chin_pass_proportion': 0,
                        'chin_well_count': 0,
                        'chin_well_proportion': 0,
                        'chin_exc_count': 0,
                        'chin_exc_proportion': 0,
                        'skip_fail_count': 0,
                        'skip_fail_proportion': 0,
                        'skip_pass_count': 0,
                        'skip_pass_proportion': 0,
                        'skip_well_count': 0,
                        'skip_well_proportion': 0,
                        'skip_exc_count': 0,
                        'skip_exc_proportion': 0,
                        'reach_fail_count': 0,
                        'reach_fail_proportion': 0,
                        'reach_pass_count': 0,
                        'reach_pass_proportion': 0,
                        'reach_well_count': 0,
                        'reach_well_proportion': 0,
                        'reach_exc_count': 0,
                        'reach_exc_proportion': 0,
                        'pul_fail_count': 0,
                        'pul_fail_proportion': 0,
                        'pul_pass_count': 0,
                        'pul_pass_proportion': 0,
                        'pul_well_count': 0,
                        'pul_well_proportion': 0,
                        'pul_exc_count': 0,
                        'pul_exc_proportion': 0,
                        'body_fat_count': 0,
                        'body_fat_proportion': 0,
                        'body_over_count': 0,
                        'body_over_proportion': 0,
                        'body_thin_count': 0,
                        'body_thin_proportion': 0,
                        'body_nor_count': 0,
                        'body_nor_proportion': 0,
                        'medical_count': 0,
                        'student_count': 0
                    };
                    if (item.resultStaminaReportData && Array.isArray(item.resultStaminaReportData)) {
                        item.resultStaminaReportData.forEach(item => {
                            tempArr.push(item);
                            subtotal.medical_count += item.medical_count;
                            subtotal.student_count += item.student_count;
                            subtotal.taper_fail_count += item.taper_fail_count;
                            subtotal.taper_fail_proportion = ((subtotal.taper_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.taper_pass_count += item.taper_pass_count;
                            subtotal.taper_pass_proportion = ((subtotal.taper_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.taper_well_count += item.taper_well_count;
                            subtotal.taper_well_proportion = ((subtotal.taper_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.taper_exc_count += item.taper_exc_count;
                            subtotal.taper_exc_proportion = ((subtotal.taper_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.grip_fail_count += item.grip_fail_count;
                            subtotal.grip_fail_proportion = ((subtotal.grip_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.grip_pass_count += item.grip_pass_count;
                            subtotal.grip_pass_proportion = ((subtotal.grip_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.grip_well_count += item.grip_well_count;
                            subtotal.grip_well_proportion = ((subtotal.grip_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.grip_exc_count += item.grip_exc_count;
                            subtotal.grip_exc_proportion = ((subtotal.grip_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.stanl_fail_count += item.stanl_fail_count;
                            subtotal.stanl_fail_proportion = ((subtotal.stanl_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.stanl_pass_count += item.stanl_pass_count;
                            subtotal.stanl_pass_proportion = ((subtotal.stanl_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.stanl_well_count += item.stanl_well_count;
                            subtotal.stanl_well_proportion = ((subtotal.stanl_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.stanl_exc_count += item.stanl_exc_count;
                            subtotal.stanl_exc_proportion = ((subtotal.stanl_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.uptodo_fail_count += item.uptodo_fail_count;
                            subtotal.uptodo_fail_proportion = ((subtotal.uptodo_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.uptodo_pass_count += item.uptodo_pass_count;
                            subtotal.uptodo_pass_proportion = ((subtotal.uptodo_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.uptodo_well_count += item.uptodo_well_count;
                            subtotal.uptodo_well_proportion = ((subtotal.uptodo_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.uptodo_exc_count += item.uptodo_exc_count;
                            subtotal.uptodo_exc_proportion = ((subtotal.uptodo_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.onet_fail_count += item.onet_fail_count;
                            subtotal.onet_fail_proportion = ((subtotal.onet_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.onet_pass_count += item.onet_pass_count;
                            subtotal.onet_pass_proportion = ((subtotal.onet_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.onet_well_count += item.onet_well_count;
                            subtotal.onet_well_proportion = ((subtotal.onet_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.onet_exc_cont += item.onet_exc_cont;
                            subtotal.onet_exc_proportion = ((subtotal.onet_exc_cont * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.eh_fail_count += item.eh_fail_count;
                            subtotal.eh_fail_proportion = ((subtotal.eh_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.eh_pass_count += item.eh_pass_count;
                            subtotal.eh_pass_proportion = ((subtotal.eh_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.eh_well_count += item.eh_well_count;
                            subtotal.eh_well_proportion = ((subtotal.eh_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.eh_exc_count += item.eh_exc_count;
                            subtotal.eh_exc_proportion = ((subtotal.eh_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.bfifty_fail_count += item.bfifty_fail_count;
                            subtotal.bfifty_fail_proportion = ((subtotal.bfifty_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.bfifty_pass_count += item.bfifty_pass_count;
                            subtotal.bfifty_pass_proportion = ((subtotal.bfifty_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.bfifty_well_count += item.bfifty_well_count;
                            subtotal.bfifty_well_proportion = ((subtotal.bfifty_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.bfifty_exc_count += item.bfifty_exc_count;
                            subtotal.bfifty_exc_proportion = ((subtotal.bfifty_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.fiftym_fail_count += item.fiftym_fail_count;
                            subtotal.fiftym_fail_proportion = ((subtotal.fiftym_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.fiftym_pass_count += item.fiftym_pass_count;
                            subtotal.fiftym_pass_proportion = ((subtotal.fiftym_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.fiftym_well_count += item.fiftym_well_count;
                            subtotal.fiftym_well_proportion = ((subtotal.fiftym_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.fiftym_exc_count += item.fiftym_exc_count;
                            subtotal.fiftym_exc_proportion = ((subtotal.fiftym_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.chin_fail_count += item.chin_fail_count;
                            subtotal.chin_fail_proportion = ((subtotal.chin_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.chin_pass_count += item.chin_pass_count;
                            subtotal.chin_pass_proportion = ((subtotal.chin_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.chin_well_count += item.chin_well_count;
                            subtotal.chin_well_proportion = ((subtotal.chin_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.chin_exc_count += item.chin_exc_count;
                            subtotal.chin_exc_proportion = ((subtotal.chin_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.skip_fail_count += item.skip_fail_count;
                            subtotal.skip_fail_proportion = ((subtotal.skip_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.skip_pass_count += item.skip_pass_count;
                            subtotal.skip_pass_proportion = ((subtotal.skip_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.skip_well_count += item.skip_well_count;
                            subtotal.skip_well_proportion = ((subtotal.skip_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.skip_exc_count += item.skip_exc_count;
                            subtotal.skip_exc_proportion = ((subtotal.skip_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.reach_fail_count += item.reach_fail_count;
                            subtotal.reach_fail_proportion = ((subtotal.reach_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.reach_pass_count += item.reach_pass_count;
                            subtotal.reach_pass_proportion = ((subtotal.reach_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.reach_well_count += item.reach_well_count;
                            subtotal.reach_well_proportion = ((subtotal.reach_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.reach_exc_count += item.reach_exc_count;
                            subtotal.reach_exc_proportion = ((subtotal.reach_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.pul_fail_count += item.pul_fail_count;
                            subtotal.pul_fail_proportion = ((subtotal.pul_fail_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.pul_pass_count += item.pul_pass_count;
                            subtotal.pul_pass_proportion = ((subtotal.pul_pass_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.pul_well_count += item.pul_well_count;
                            subtotal.pul_well_proportion = ((subtotal.pul_well_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.pul_exc_count += item.pul_exc_count;
                            subtotal.pul_exc_proportion = ((subtotal.pul_exc_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.body_fat_count += item.body_fat_count;
                            subtotal.body_fat_proportion = ((subtotal.body_fat_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.body_over_count += item.body_over_count;
                            subtotal.body_over_proportion = ((subtotal.body_over_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.body_thin_count += item.body_thin_count;
                            subtotal.body_thin_proportion = ((subtotal.body_thin_count * 100) / subtotal.medical_count).toFixed(2);
                            subtotal.body_nor_count += item.body_nor_count;
                            subtotal.body_nor_proportion = ((subtotal.body_nor_count * 100) / subtotal.medical_count).toFixed(2);
                        });
                    }
                    tempArr.push(subtotal);
                    allTotal.medical_count += subtotal.medical_count;
                    allTotal.student_count += subtotal.student_count;
                    allTotal.taper_fail_count += subtotal.taper_fail_count;
                    allTotal.taper_fail_proportion = ((allTotal.taper_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.taper_pass_count += subtotal.taper_pass_count;
                    allTotal.taper_pass_proportion = ((allTotal.taper_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.taper_well_count += subtotal.taper_well_count;
                    allTotal.taper_well_proportion = ((allTotal.taper_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.taper_exc_count += subtotal.taper_exc_count;
                    allTotal.taper_exc_proportion = ((allTotal.taper_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.grip_fail_count += subtotal.grip_fail_count;
                    allTotal.grip_fail_proportion = ((allTotal.grip_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.grip_pass_count += subtotal.grip_pass_count;
                    allTotal.grip_pass_proportion = ((allTotal.grip_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.grip_well_count += subtotal.grip_well_count;
                    allTotal.grip_well_proportion = ((allTotal.grip_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.grip_exc_count += subtotal.grip_exc_count;
                    allTotal.grip_exc_proportion = ((allTotal.grip_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.stanl_fail_count += subtotal.stanl_fail_count;
                    allTotal.stanl_fail_proportion = ((allTotal.stanl_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.stanl_pass_count += subtotal.stanl_pass_count;
                    allTotal.stanl_pass_proportion = ((allTotal.stanl_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.stanl_well_count += subtotal.stanl_well_count;
                    allTotal.stanl_well_proportion = ((allTotal.stanl_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.stanl_exc_count += subtotal.stanl_exc_count;
                    allTotal.stanl_exc_proportion = ((allTotal.stanl_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.uptodo_fail_count += subtotal.uptodo_fail_count;
                    allTotal.uptodo_fail_proportion = ((allTotal.uptodo_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.uptodo_pass_count += subtotal.uptodo_pass_count;
                    allTotal.uptodo_pass_proportion = ((allTotal.uptodo_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.uptodo_well_count += subtotal.uptodo_well_count;
                    allTotal.uptodo_well_proportion = ((allTotal.uptodo_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.uptodo_exc_count += subtotal.uptodo_exc_count;
                    allTotal.uptodo_exc_proportion = ((allTotal.uptodo_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.onet_fail_count += subtotal.onet_fail_count;
                    allTotal.onet_fail_proportion = ((allTotal.onet_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.onet_pass_count += subtotal.onet_pass_count;
                    allTotal.onet_pass_proportion = ((allTotal.onet_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.onet_well_count += subtotal.onet_well_count;
                    allTotal.onet_well_proportion = ((allTotal.onet_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.onet_exc_cont += subtotal.onet_exc_cont;
                    allTotal.onet_exc_proportion = ((allTotal.onet_exc_cont * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.eh_fail_count += subtotal.eh_fail_count;
                    allTotal.eh_fail_proportion = ((allTotal.eh_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.eh_pass_count += subtotal.eh_pass_count;
                    allTotal.eh_pass_proportion = ((allTotal.eh_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.eh_well_count += subtotal.eh_well_count;
                    allTotal.eh_well_proportion = ((allTotal.eh_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.eh_exc_count += subtotal.eh_exc_count;
                    allTotal.eh_exc_proportion = ((allTotal.eh_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.bfifty_fail_count += subtotal.bfifty_fail_count;
                    allTotal.bfifty_fail_proportion = ((allTotal.bfifty_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.bfifty_pass_count += subtotal.bfifty_pass_count;
                    allTotal.bfifty_pass_proportion = ((allTotal.bfifty_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.bfifty_well_count += subtotal.bfifty_well_count;
                    allTotal.bfifty_well_proportion = ((allTotal.bfifty_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.bfifty_exc_count += subtotal.bfifty_exc_count;
                    allTotal.bfifty_exc_proportion = ((allTotal.bfifty_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.fiftym_fail_count += subtotal.fiftym_fail_count;
                    allTotal.fiftym_fail_proportion = ((allTotal.fiftym_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.fiftym_pass_count += subtotal.fiftym_pass_count;
                    allTotal.fiftym_pass_proportion = ((allTotal.fiftym_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.fiftym_well_count += subtotal.fiftym_well_count;
                    allTotal.fiftym_well_proportion = ((allTotal.fiftym_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.fiftym_exc_count += subtotal.fiftym_exc_count;
                    allTotal.fiftym_exc_proportion = ((allTotal.fiftym_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.chin_fail_count += subtotal.chin_fail_count;
                    allTotal.chin_fail_proportion = ((allTotal.chin_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.chin_pass_count += subtotal.chin_pass_count;
                    allTotal.chin_pass_proportion = ((allTotal.chin_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.chin_well_count += subtotal.chin_well_count;
                    allTotal.chin_well_proportion = ((allTotal.chin_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.chin_exc_count += subtotal.chin_exc_count;
                    allTotal.chin_exc_proportion = ((allTotal.chin_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.skip_fail_count += subtotal.skip_fail_count;
                    allTotal.skip_fail_proportion = ((allTotal.skip_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.skip_pass_count += subtotal.skip_pass_count;
                    allTotal.skip_pass_proportion = ((allTotal.skip_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.skip_well_count += subtotal.skip_well_count;
                    allTotal.skip_well_proportion = ((allTotal.skip_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.skip_exc_count += subtotal.skip_exc_count;
                    allTotal.skip_exc_proportion = ((allTotal.skip_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.reach_fail_count += subtotal.reach_fail_count;
                    allTotal.reach_fail_proportion = ((allTotal.reach_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.reach_pass_count += subtotal.reach_pass_count;
                    allTotal.reach_pass_proportion = ((allTotal.reach_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.reach_well_count += subtotal.reach_well_count;
                    allTotal.reach_well_proportion = ((allTotal.reach_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.reach_exc_count += subtotal.reach_exc_count;
                    allTotal.reach_exc_proportion = ((allTotal.reach_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.pul_fail_count += subtotal.pul_fail_count;
                    allTotal.pul_fail_proportion = ((allTotal.pul_fail_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.pul_pass_count += subtotal.pul_pass_count;
                    allTotal.pul_pass_proportion = ((allTotal.pul_pass_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.pul_well_count += subtotal.pul_well_count;
                    allTotal.pul_well_proportion = ((allTotal.pul_well_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.pul_exc_count += subtotal.pul_exc_count;
                    allTotal.pul_exc_proportion = ((allTotal.pul_exc_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.body_fat_count += subtotal.body_fat_count;
                    allTotal.body_fat_proportion = ((allTotal.body_fat_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.body_over_count += subtotal.body_over_count;
                    allTotal.body_over_proportion = ((allTotal.body_over_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.body_thin_count += subtotal.body_thin_count;
                    allTotal.body_thin_proportion = ((allTotal.body_thin_count * 100) / allTotal.medical_count).toFixed(2);
                    allTotal.body_nor_count += subtotal.body_nor_count;
                    allTotal.body_nor_proportion = ((allTotal.body_nor_count * 100) / allTotal.medical_count).toFixed(2);
                });
                tempArr.push(allTotal);
                this.tableData = tempArr;
            }
        },
        created() {
            this.getSelectCondition();
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
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
            window.onresize = null;
            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
            }
        }
    };
</script>

<style lang="less">
    .fitData {
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

        #myChart {
            width: 100%;
            height: 100%;
        }
    }

    .autoWidth.ivu-select {
        width: auto;
    }
</style>
