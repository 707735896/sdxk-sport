<template>
    <div class="monitorElecReport">
        <div class="content-box">
            <h3 class="title">体质监测电子报告</h3>
            <Form class="clearfix search-form" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="req.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="req.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="75">
                    <i-select v-model="req.dep_id" filterable style="width:150px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="45">
                    <i-select v-model="req.grade_no" style="width:100px" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="45">
                    <i-select v-model="req.class_no" style="width:100px">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="检测项" :label-width="60" ref="propV">
                    <i-select class="project2" v-model="detection"
                              style="max-width:300px;max-height:34px;overflow-y: auto" multiple>
                        <i-option v-for="item of projectList" :key="item.id" :value="item.id">
                            {{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>

                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div style="margin-top:4px">
                <div class="add" @click="prints">
                    <img alt="print" src="../../../assets/common/print.png"/>
                    打印
                </div>
                <!-- <div class="add" @click="exports">
                    <img alt="export" src="../../../assets/common/export.png"/>
                    导出
                </div> -->
            </div>
            <!-- 表格 -->
            <BaseTable border center :columns="columns" ref="reportTable" :data="tableData" @on-row-dblclick="dbclick"
                   class="reportList"></BaseTable>
            <!-- 分页 -->
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current='pageConfig.page'
                  :page-size-opts='pageConfig.opts'
                  :page-size='pageConfig.size'
                  @on-change='pageChange'
                  @on-page-size-change='sizeChange'/>
        </div>
        <component :title="modalTitle" :is='com' :row='stuInfo' :year='year' :flag="flag" :student_id='student_id'
                   @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import electronicReportInfo from './electronicReportInfo';
    import printSummaryReport from './printReportTest';
    import m_analysisReports from './m_analysisReports';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'monitorElecReport',
        data() {
            return {
                req: {
                    status: '-1',
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    code: '',
                    student_name: ''
                },
                tableData: [],
                currentRow: {},
                currentid: 0,
                columns: [],
                columnsAll: [
                    {
                        title: ' ',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                        render: (h, params) => {
                            let id = params.row.id;
                            let flag = false;
                            if (this.currentid === id) {
                                flag = true;
                            } else {
                                flag = false;
                            }
                            let self = this;
                            return h('div', [
                                h('Radio', {
                                    props: {
                                        value: flag
                                    },
                                    style: {
                                        marginLeft: '8px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        'on-change': () => {
                                            self.currentid = id;
                                            this.currentRow = params.row;
                                        }
                                    }
                                })
                            ]);

                        }

                    },
                    {
                        type: 'index',
                        width: 60,
                        fixed: 'left',
                        title: '序号',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 80,
                        key: 'year',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 170,
                        key: 'area_name',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        minWidth: 130,
                        key: 'school_name',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'grade_name',
                        align: 'center'
                    },
                    {
                        title: '班级',
                        width: 70,
                        key: 'class_name',
                        align: 'center'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        width: 70,
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '一般',
                        align: 'center',
                        children: [
                            {
                                title: '身高(cm)',
                                key: 'height',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '体重(kg)',
                                key: 'weight',
                                align: 'center',
                                width: 70
                            },
                        ]
                    },
                    // {
                    //     title: '课桌椅型号',
                    //     align: 'center',
                    //     width: 62,
                    //     key: 'desk_mat'
                    // },
                    {
                        title: '生理功能',
                        align: 'center',
                        children: [
                            {
                                title: '收缩压(mmHg)',
                                key: 'sp',
                                align: 'center',
                                width: 65
                            },
                            {
                                title: '舒张压(mmHg)',
                                key: 'dp',
                                align: 'center',
                                width: 65
                            },
                            {
                                title: '脉搏(次/分钟)',
                                key: 'pulse',
                                align: 'center',
                                width: 70
                            }
                        ]
                    },
                    {
                        title: '胸围(cm)',
                        key: 'chest',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '肺活量(ml)',
                        key: 'vital_capacity',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '50米跑(s)',
                        key: 'run_fiftym',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '立定跳远(cm)',
                        key: 'standing_jump',
                        align: 'center',
                        width: 75
                    },
                    {
                        title: '斜身引体(次)',
                        key: 'oblique_pullups',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '引体向上(次)',
                        key: 'pull_up',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '一分钟仰卧起坐(次)',
                        key: 'sit_up',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '握力(kg)',
                        key: 'grip',
                        align: 'center',
                        width: 65
                    },
                    {
                        title: '50米*8往返跑(s)',
                        key: 'runback_fiftym',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '800米跑(s)',
                        key: 'run_ehm',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '1000米跑(s)',
                        key: 'run_othm',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '坐位体前屈(cm)',
                        key: 'bent_forward',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '俯卧背起(次)',
                        key: 'back_stomach',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '内科',
                        align: 'center',
                        children: [
                            {
                                title: '心率(次/分钟)',
                                key: 'heart_rate',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '心脏杂音',
                                key: 'cardiac_souffle',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    if (params.row.cardiac_souffle === null) {
                                        return params.row.cardiac_souffle === '';
                                    } else {
                                        return h('span', null, params.row.cardiac_souffle === 1 ? '无' : '有');
                                    }
                                }
                            },
                            {
                                title: '心律',
                                key: 'cardiac_rhythm',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    if (params.row.cardiac_rhythm === null) {
                                        return params.row.cardiac_rhythm === '';
                                    } else {
                                        return h('span', null, params.row.cardiac_rhythm === 1 ? '齐' : params.row.cardiac_rhythm === 2 ? '不齐' : '绝对不齐');
                                    }
                                }
                            },
                            {
                                title: '肺部罗音',
                                key: 'lung_rale',
                                width: 80,
                                align: 'center',
                                render: (h, params) => {
                                    if (params.row.lung_rale === null) {
                                        return params.row.lung_rale === '';
                                    } else {
                                        return h('span', null, params.row.lung_rale === 1 ? '无' : params.row.lung_rale === 2 ? '干罗音' : '湿罗音');
                                    }
                                }
                            },
                            {
                                title: '肝',
                                key: 'liver',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    if (params.row.liver == null) {
                                        console.log(params.row.liver)
                                        return params.row.liver === '';
                                    } else {
                                        return h('span', null, params.row.liver === 1 ? '正常' : '肝大');
                                    }
                                }
                            },
                            {
                                title: '脾',
                                key: 'spleen',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    if (params.row.spleen === null) {
                                        return params.row.spleen === '';
                                    } else {
                                        return h('span', null, params.row.spleen === 1 ? '正常' : '脾大');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '视力',
                        align: 'center',
                        children: [
                            {
                                title: '右眼',
                                key: 'r_eyesight',
                                align: 'center',
                                width: 60
                            },
                            {
                                title: '左眼',
                                key: 'l_eyesight',
                                align: 'center',
                                width: 70,
                            },
                            {
                                title: '右眼矫正视力',
                                key: 'r_bcva',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '左眼矫正视力',
                                key: 'l_bcva',
                                width: 70,
                                align: 'center',
                            },
                            {
                                title: '右眼串镜正片',
                                key: 'r_positivelens',
                                align: 'center',
                                width: 70,
                                render: (h, params) => {
                                    return h('span', null, params.row.r_positivelens == 1 ? '↑' : params.row.r_positivelens == 2 ? '↓' : '0');
                                }
                            },
                            {
                                title: '右眼串镜负片',
                                key: 'r_negativefilm',
                                width: 70,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', null, params.row.r_negativefilm == 1 ? '↑' : params.row.r_negativefilm == 2 ? '↓' : '0');
                                }
                            },
                            {
                                title: '左眼串镜正片',
                                key: 'l_positivelens',
                                align: 'center',
                                width: 70,
                                render: (h, params) => {
                                    return h('span', null, params.row.l_positivelens === 1 ? '↑' : params.row.l_positivelens === 2 ? '↓' : '0');
                                }
                            },
                            {
                                title: '左眼串镜负片',
                                key: 'l_negativefilm',
                                width: 70,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', null, params.row.l_negativefilm === 1 ? '↑' : params.row.l_negativefilm === 2 ? '↓' : '0');
                                }
                            },
                            {
                                title: '屈光不正右眼',
                                key: 'r_negativefilm',
                                width: 70,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', null, params.row.r_negativefilm === 1 ? params.row.r_negativefilm : '正常');
                                }
                            },
                            {
                                title: '屈光不正左眼',
                                key: 'r_negativefilm',
                                width: 70,
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', null, params.row.r_negativefilm === 1 ? params.row.r_negativefilm : '正常');
                                }
                            },
                            {
                                title: '屈光度右眼(S)',
                                key: 'r_s',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '屈光度右眼(C)',
                                key: 'r_c',
                                width: 70,
                                align: 'center',
                            },
                            {
                                title: '屈光度右眼(A)',
                                key: 'r_a',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '屈光度左眼(S)',
                                key: 'l_s',
                                width: 70,
                                align: 'center',
                            },
                            {
                                title: '屈光度左眼(C)',
                                key: 'l_c',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '屈光度左眼(A)',
                                key: 'l_a',
                                width: 70,
                                align: 'center',
                            },
                            {
                                title: '屈光度(PD)',
                                key: 'pd',
                                align: 'center',
                                width: 70
                            },
                            // {
                            //     title: '屈光',
                            //     key: 'l_dioptric',
                            //     width: 60,
                            //     align: 'center',
                            //     render:(h,params)=>{
                            //         return h('span',null,params.row.l_dioptric === 1 ?'否':'是')
                            //     }

                            // }
                        ]
                    },
                    {
                        title: '口腔科',
                        align: 'center',
                        children: [
                            {
                                title: '齿列',
                                key: 'dentition ',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition === 1 ? '整齐' : '不齐');
                                }
                            },
                            {
                                title: '牙周',
                                key: 'periodontal',
                                align: 'center',
                                width: 80,
                            },
                            {
                                title: '有无龋齿',
                                key: 'decayed_tooth ',
                                align: 'center',
                                width: 70,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition === 1 ? '有' : '无');
                                }
                            },
                            {
                                title: '龋患恒牙',
                                key: 'he_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋患乳牙',
                                key: 'ru_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋失恒牙',
                                key: 'he_lose',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋失乳牙',
                                key: 'ru_lose',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋补恒牙',
                                key: 'he_repair',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋补乳牙',
                                key: 'ru_repair',
                                align: 'center',
                                width: 80
                            }
                        ]
                    },
                    {
                        title: '月经初期（女）',
                        key: 'menstruation',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.menstruation === 0 ? '已有' : params.row.menstruation === 1 ? '未有' : '不能回答');
                        }
                    },
                    {
                        title: '首次遗精（男）',
                        key: 'gonacratia',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.gonacratia === 0 ? '已有' : params.row.gonacratia === 1 ? '未有' : '不能回答');
                        }
                    },
                ],
                columns1: [
                    {
                        title: ' ',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                        render: (h, params) => {
                            let id = params.row.id;
                            let flag = false;
                            if (this.currentid === id) {
                                flag = true;
                            } else {
                                flag = false;
                            }
                            let self = this;
                            return h('Radio', {
                                props: {
                                    value: flag
                                },
                                style: {
                                    marginLeft: '8px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    'on-change': () => {
                                        self.currentid = id;
                                        this.currentRow = params.row;
                                    }
                                }
                            });
                        }
                    },
                    {
                        type: 'index',
                        width: 60,
                        fixed: 'left',
                        title: '序号',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 80,
                        key: 'year',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 170,
                        key: 'area_name',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        minWidth: 130,
                        key: 'school_name',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'grade_name',
                        align: 'center'
                    },
                    {
                        title: '班级',
                        width: 100,
                        key: 'class_name',
                        align: 'center'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        width: 70,
                        key: 'age',
                        align: 'center'
                    }
                    // {
                    //     title: '课桌椅型号',
                    //     align: 'center',
                    //     width: 100,
                    //     key: 'desk_mat'
                    // },
                ],
                columns2: [
                    {
                        title: '一般',
                        align: 'center',
                        children: [
                            {
                                title: '身高(cm)',
                                key: 'height',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '体重(kg)',
                                key: 'weight',
                                align: 'center',
                                width: 80
                            },
                        ]
                    },
                    {
                        title: '生理功能',
                        align: 'center',
                        children: [
                            {
                                title: '收缩压(mmHg)',
                                key: 'sp',
                                align: 'center',
                                width: 110
                            },
                            {
                                title: '舒张压(mmHg)',
                                key: 'dp',
                                align: 'center',
                                width: 110
                            },
                            {
                                title: '脉搏(次/分钟)',
                                key: 'pulse',
                                align: 'center',
                                width: 110
                            }
                        ]
                    },
                    {
                        title: '胸围(cm)',
                        key: 'chest',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '肺活量(ml)',
                        key: 'vital_capacity',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '50米跑(s)',
                        key: 'run_fiftym',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '立定跳远(cm)',
                        key: 'standing_jump',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '斜身引体(次)',
                        key: 'oblique_pullups',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '引体向上(次)',
                        key: 'pull_up',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '一分钟仰卧起坐(次)',
                        key: 'sit_up',
                        align: 'center',
                        width: 140
                    },
                    {
                        title: '握力(kg)',
                        key: 'grip',
                        align: 'center',
                        width: 70
                    },
                    {
                        title: '50米*8往返跑(s)',
                        key: 'runback_fiftym',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '800米跑(s)',
                        key: 'run_ehm',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '1000米跑(s)',
                        key: 'run_othm',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '坐位体前屈(cm)',
                        key: 'bent_forward',
                        align: 'center',
                        width: 110
                    },
                    {
                        title: '俯卧背起(次)',
                        key: 'back_stomach',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '内科',
                        align: 'center',
                        children: [
                            {
                                title: '心率(次/分钟)',
                                key: 'heart_rate',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '心脏杂音',
                                key: 'cardiac_souffle',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    if (params.row.cardiac_souffle === null) {
                                        return params.row.cardiac_souffle === '';
                                    } else {
                                        return h('span', null, params.row.cardiac_souffle === 1 ? '无' : '有');
                                    }
                                }
                            },
                            {
                                title: '心律',
                                key: 'cardiac_rhythm',
                                align: 'center',
                                width: 70,
                                render: (h, params) => {
                                    if (params.row.cardiac_rhythm === null) {
                                        return params.row.cardiac_rhythm === '';
                                    } else {
                                        return h('span', null, params.row.cardiac_rhythm === 1 ? '齐' : params.row.cardiac_rhythm === 2 ? '不齐' : '绝对不齐');
                                    }
                                }
                            },
                            {
                                title: '肺部罗音',
                                key: 'lung_rale',
                                width: 80,
                                align: 'center',
                                render: (h, params) => {
                                    if (params.row.lung_rale === null) {
                                        return params.row.lung_rale === '';
                                    } else {
                                        return h('span', null, params.row.lung_rale === 1 ? '无' : params.row.lung_rale === 2 ? '干罗音' : '湿罗音');
                                    }
                                }
                            },
                            {
                                title: '肝',
                                key: 'liver',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    if (params.row.liver === null) {
                                        return params.row.liver === '';
                                    } else {
                                        return h('span', null, params.row.liver === 1 ? '正常' : '肝大');
                                    }
                                }
                            },
                            {
                                title: '脾',
                                key: 'spleen',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    if (params.row.spleen === null) {
                                        return params.row.spleen === '';
                                    } else {
                                        return h('span', null, params.row.spleen === 1 ? '正常' : '脾大');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: '视力',
                        align: 'center',
                        children: [
                            {
                                title: '裸眼视力右眼',
                                key: 'r_eyesight',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '裸眼视力左眼',
                                key: 'l_eyesight',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '戴镜视力右眼',
                                key: 'r_bcva',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '戴镜视力左眼',
                                key: 'l_bcva',
                                width: 100,
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '口腔科',
                        align: 'center',
                        children: [
                            {
                                title: '齿列',
                                key: 'dentition ',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition === 1 ? '整齐' : '不齐');
                                }
                            },
                            {
                                title: '牙周',
                                key: 'periodontal',
                                align: 'center',
                                width: 80,
                            },
                            {
                                title: '有无龋齿',
                                key: 'decayed_tooth ',
                                align: 'center',
                                width: 70,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition === 1 ? '有' : '无');
                                }
                            },
                            {
                                title: '龋患恒牙',
                                key: 'he_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋患乳牙',
                                key: 'ru_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋失恒牙',
                                key: 'he_lose',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋失乳牙',
                                key: 'ru_lose',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋补恒牙',
                                key: 'he_repair',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '龋补乳牙',
                                key: 'ru_repair',
                                align: 'center',
                                width: 80
                            }
                        ]
                    },
                    {
                        title: '月经初潮(女)',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            if (params.row.gender === 1) {
                                return h('span', null, '-');
                            }
                            let men = params.row.menstruation;
                            if (men === 0) {
                                return h('span', null, '已有');
                            } else if (men === 2) {
                                return h('span', null, '未有');
                            } else if (men === 9) {
                                return h('span', null, '不能回答');
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '首次遗精(男)',
                        align: 'center',
                        width: 100,
                        render: (h, params) => {
                            if (params.row.gender === 2) {
                                return h('span', null, '-');
                            }
                            let men = params.row.gonacratia;
                            if (men === 0) {
                                return h('span', null, '已有');
                            } else if (men === 2) {
                                return h('span', null, '未有');
                            } else if (men === 9) {
                                return h('span', null, '不能回答');
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '问卷调查',
                        align: 'center',
                        width: 100,
                        ellipsis: true,
                        tooltip: true,
                        key: 'que_survey'
                    },
                    {
                        title: '主检结论',
                        align: 'center',
                        width: 100,
                        ellipsis: true,
                        tooltip: true,
                        key: 'main_inspection'
                    }
                ],
                action_columns: [
                    {
                        title: '操作',
                        align: 'center',
                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.infos(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/common/info.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '详情')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.analyze(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/physicalFitnessTest/analyze.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '分析')
                                ]),

                            ]);
                        }
                    }
                ],
                detection: [],
                yearList: [],
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                projectList: [],
                modalTitle: '',
                flag: false,
                id: '',
                modal: false,
                com: null,
                stuInfo: null,
                year: null,
                student_id: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                // 口腔--牙周
                periodontalCondition: {
                    1: '阴性',
                    2: '牙龈炎',
                    3: '牙石',
                    4: '浅牙周袋',
                    5: '深牙周袋',
                },
                propSelection: [],
                is_manage: true
            };
        },
        methods: {
            // 获取查询下拉框
            getSelectCondition() {
                this.yearList = yearLists().reverse();

                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
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

                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === 2);
                        if (!this.is_manage) {
                            this.schoolChange(this.req.dep_id);
                        }
                    } else {
                        this.schoolList = [];
                    }
                })
                    .catch(err => {
                        window.console.log(err);
                    });

                this.$ajax({
                    // 检测项目
                    url: urls.monitorTeam_set_name,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                    }
                });
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(({id}) => id === value);
                if (!temp.length) {
                    return false;
                }
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
            gradeChange(value) {
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: value,
                        dep_id: this.req.school_id,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },

            // 获取区级城市
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            // 查询
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            // 列表数据
            search() {
                const {year, area_id1, area_id2, dep_id, grade_no, class_no} = this.req;
                if (!this.detection.length) {
                    this.columns = [...this.columns1, ...this.columns2, ...this.action_columns];
                } else {
                    let tmp = [];
                    this.detection.forEach(item => {
                        if (item === '8EE7B19DFAC74C7E898E983785800A0A') { //一般
                            tmp.push(this.columns2[0]);
                        } else if (item === '8e185be85aa84a69894d33bc80aee4dc') {//生理功能
                            tmp.push(this.columns2[1]);
                        } else if (item === '17A4564A4AC04DF5AA5DA0DA486BC2B0') {//胸围
                            tmp.push(this.columns2[2]);
                        } else if (item === '974DEF00FADE480EA8640D09048A1EAA') {//肺活量
                            tmp.push(this.columns2[3]);
                        } else if (item === 'D4E320F6A79943DEA051909FCB9A333A') {//50米跑
                            tmp.push(this.columns2[4]);
                        } else if (item === '3C3FE6DE526A40E9A9C767D52DAB3DBA') {//立定跳远
                            tmp.push(this.columns2[5]);
                        } else if (item === '8CED5936B1B149D185C1817C79C25CC7') {//斜身引体(男)
                            tmp.push(this.columns2[6]);
                        } else if (item === '00406BBF634F46F18AAD2BACC20848CD') {//引体向上(男)
                            tmp.push(this.columns2[7]);
                        } else if (item === '440FAFF92A244067BFF66F93535CD40C') {//一分钟仰卧起坐(女)
                            tmp.push(this.columns2[8]);
                        } else if (item === 'BBEFE6B76E5A4F7FAF613C8F1821230D') {//握力
                            tmp.push(this.columns2[9]);
                        } else if (item.id === '9B07CA9871F3448EAD9D5B65FA8F0DC9') {//50米*8往返跑
                            tmp.push(this.columns2[10]);
                        } else if (item === '61565E92B26B4DC9A1A58D4F22A26664') {//800米跑(女)
                            tmp.push(this.columns2[11]);
                        } else if (item === '4E43940DD0D2452DA021B8DF02AA1FD4') {//1000米跑(男)
                            tmp.push(this.columns2[12]);
                        } else if (item === 'EECD8F0D74C34C1DB05BF5588F44C63D') {//坐位体前屈
                            tmp.push(this.columns2[13]);
                        } else if (item === '7701F78D1DFB4D83AE4072FC87C4BE96') {//俯卧背起
                            tmp.push(this.columns2[14]);
                        } else if (item === 'C3B16749490B4FB6936FCE6ADC584239') {//内科检查
                            tmp.push(this.columns2[15]);
                        } else if (item === 'EB8008CA3A4748A7A3A803EB250EAE4F') {//视力
                            tmp.push(this.columns2[16]);
                        } else if (item === '11C5EB39EBA34971ABE9C2109A91E508') {//龋齿
                            tmp.push(this.columns2[17]);
                        } else if (item === '76CAF3BCA30D4E6D9193654AB41C2D55') {//问卷调查
                            tmp.push(this.columns2[20]);
                        } else if (item === '4CB1D6E85926467392DC1E194032AAF9') {//主检
                            tmp.push(this.columns2[21]);
                        }
                    });
                    this.columns = [...this.columns1, ...tmp, ...this.action_columns];
                }
                this.$ajax({
                    url: urls.monitorReport,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year: year,
                        area_pid: area_id1 === '-1' ? null : area_id1,
                        area_id: area_id2 === '-1' ? null : area_id2,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        class_no: class_no === '-1' ? null : class_no
                    }
                }).then(data => {
                    if (data.code === 200) {
                        let res = data.data;
                        res.forEach(item => {
                            item.periodontal = item.periodontal ? this.getDetailCondition(item.periodontal, 1) : '';
                        });
                        this.tableData = res;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.tableData = [];
                });
            },
            infos(row) {
                this.com = electronicReportInfo;
                this.stuInfo = row;
                this.flag = true;
                this.modalTitle = '详情页';
            },
            // 双击详情
            dbclick(row) {
                this.com = electronicReportInfo;
                this.stuInfo = row;
                this.flag = true;
                this.modalTitle = '详情页';
            },
            // 打印
            prints() {
                if (this.currentRow.id === this.currentid) {
                    this.com = printSummaryReport;
                    this.year = this.currentRow.year;
                    this.student_id = this.currentRow.id;
                    this.flag = true;
                    this.modalTitle = '打印';
                } else {
                    this.$Message.error('请选择要打印的报告');
                }
            },
            // 分析
            analyze(row) {
                console.log(row);
                this.com = m_analysisReports;
                this.stuInfo = row;
                this.flag = true;
                this.modalTitle = '分析页';
            },
            // 分析参数取值
            getDetailCondition(argu, type) {
                if (type === 1) {//牙周
                    return this.periodontalCondition[argu] || '其他';
                }

            },
            // 分页
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .monitorElecReport {
        .project2 .ivu-select-selection div {
            max-height: 30px;
        }
    }

    .reportList {
        thead {
            th {
                .ivu-table-cell {
                    font-size: 14px !important;
                }
            }
        }
    }

    .report-title {
        margin-top: 35px;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: #000000;
    }

    .trisection {
        display: inline-block;
        flex: 1;
        margin-bottom: 1%;
        width: 32%;

        img {
            width: 25%;
            margin-top: 4%;
        }
    }

    .rateInfoShow {
        img {
            width: 8%;
            margin-top: 2%;
        }
    }

    .dblinfo {
        // height: 100px;
        // margin-bottom: 16px;
        margin-bottom: 2%;

        img {
            width: 8%;
            margin-top: 1%;
        }
    }

    .anayImg {
        float: left;
    }

    .monitorElecReportBox {
        position: relative;
        height: 700px;
        overflow-y: scroll;
        overflow-x: hidden;

        .monitorElecReport-container {
            overflow: auto;
            // float: left;
            padding-left: 16px;

            .report-value-content {
                padding-top: 10px;
                color: #000000;
                font-size: 14px;
            }

            .normal {
                font-weight: 600;
            }

            .report-error {
                font-size: 16px;
                color: #ed5145;
            }

            .report-normal {
                font-size: 16px;
                color: #299E97;
            }

        }
    }

    .printModal .ivu-modal {
        top: 30px !important;
    }

    .anaysisModal .ivu-modal {
        // top: 80px !important;
    }

    .anaysisModal {
        .ivu-modal-body {
            padding-bottom: 32px !important;
        }
    }

    // 分析
    .report-title {
        font-size: 20px;
    }

    .monitorElecReport-container {
        .report-value-content {
            .toothCondition {
                margin-left: 16px;
            }

            .eyesCondition {
                margin-left: 20px;
            }
        }

        .report-value {
            .infoSize {
                font-size: 14px !important;
            }
        }

        .report-normal, .report-error {
            font-size: 14px !important;
        }
    }

    .ivu-tooltip, .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }

</style>
