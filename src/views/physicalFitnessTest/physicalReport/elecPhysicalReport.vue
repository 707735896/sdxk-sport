<template>
    <div class="elecPhysicalReport">
        <div class="content-box">
            <h3 class="title">体能测试电子报告</h3>
            <Form class="clearfix search-form" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select v-model="req.year" style="width:120px">
                        <i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}
                        </i-option>
                    </i-select>
                    <!--<DatePicker type="year" format="yyyy" v-model="req.year" style="width: 100px"></DatePicker>-->
                </FormItem>
                <FormItem label="所属区域" style="width:300px;">
                    <i-select v-model="req.area_id" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id1" style="width:120px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属学校" :label-width="80">
                    <i-select v-model="req.school_id" style="width:150px;" filterable @on-change="schoolChange"
                              :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item of schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" :label-width="80">
                    <i-select v-model="req.grade_id" style="width:120px" @on-change="gradeChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属班级" :label-width="80">
                    <i-select v-model="req.class_id" style="width:120px">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体测项" :label-width="60" style="margin-right: 0!important;">
                    <i-select class="project2" v-model="req.project" multiple
                              style="max-width:300px;max-height:34px;overflow-y: auto">
                        <i-option v-for="item of projectList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="search()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <!--<div>-->
            <!--<div class="add" @click="prints">-->
            <!--<img src="@/assets/common/print.png" alt="print"/>-->
            <!--打印-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="add" @click="exports">&ndash;&gt;-->
            <!--&lt;!&ndash;<img src="@/assets/common/export.png" alt="export"/>&ndash;&gt;-->
            <!--&lt;!&ndash;导出&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <BaseTable border center :columns="columns" ref="reportTable" :data="tableData"
                   class="reportList"></BaseTable>
            <!--<BaseTable border :disabled-hover='true' :columns="columns" :data="tableData"-->
            <!--@on-selection-change="selectionsChange"></BaseTable>-->
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
            <Modal
                title="分析页面"
                v-model="modal"
                :mask-closable="false"
                :width="1200"
                footer-hide
                @on-cancel="alyClose"
            >
                <div class="elecPhysical-analyze">
                    <div style="width: 320px;">
                        <img src="../../../assets/physicalFitnessTest/boy.png" v-if="!sex"/>
                        <img src="../../../assets/physicalFitnessTest/girl.png" v-else/>
                        <div class="report-title">{{studentName}}---电子体测报告</div>
                    </div>
                    <div style="margin-left: 80px">
                        <div class="data-item" v-if="analyzeHeight">
                            <img src="../../../assets/physicalFitnessTest/physicalPrepare/body.png" alt="BMI"/>
                            <div class="report-value-wrapper">
                                <div class="img-title">BMI</div>
                                <div style="margin-left: 40px">
                                    <div class="report-value-content">
                                        <span class="normal">身高：</span>
                                        <span class="report-value">
                                            <span>{{heightObj.othervalue1}}</span>
                                            <span class="value-unit">cm</span>
                                        </span>
                                        <span class="normal">体重：</span>
                                        <span class="report-value">
                                            <span>{{heightObj.othervalue2}}</span>
                                            <span class="value-unit">kg</span>
                                        </span>
                                        <span class="normal">BMI：</span>
                                        <span class="report-value">{{heightObj.resultvalue}}</span>
                                    </div>
                                    <div class="report-red-content">
                                        <span class="normal">得分：</span>
                                        <span class="report-value">{{heightObj.score}}</span>
                                        <!--<span class="normal">占比：</span>-->
                                        <!--<span class="report-value">{{heightObj.proportion}}</span>-->
                                        <!--<span class="normal">加权得分：</span>-->
                                        <!--<span class="report-value">{{heightObj.weighted_score}}</span>-->
                                    </div>
                                    <div class="report-red-content">
                                        <span class="nospan">结论：</span>
                                        <span class="nospan">{{heightObj.score}}</span>
                                        <!--<span class="normal">占比：</span>-->
                                        <!--<span class="report-value">{{heightObj.proportion}}</span>-->
                                        <!--<span class="normal">加权得分：</span>-->
                                        <!--<span class="report-value">{{heightObj.weighted_score}}</span>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="data-item" v-for="item of analyzeList" :key="item.fitness">
                            <img :src="item.imgsrc" :alt="item.fitness">
                            <div class="report-value-wrapper">
                                <div class="img-title">{{item.fitness}}</div>
                                <div style="margin-left: 40px">
                                    <div class="report-value-content">
                                        <span class="normal">成绩：</span>
                                        <span class="report-value">
                                            <span>{{item.resultvalue}}</span>
                                            <span class="value-unit">{{item.unit}}</span>
                                        </span>
                                    </div>
                                    <div class="report-red-content">
                                        <span class="normal">得分：</span>
                                        <span class="report-value">{{item.score}}</span>
                                        <!--<span class="normal">占比：</span>-->
                                        <!--<span class="report-value">{{item.proportion}}</span>-->
                                        <!--<span class="normal">加权得分：</span>-->
                                        <!--<span class="report-value">{{item.weighted_score}}</span>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="height: 100px">
                            <div style="height: 1px;background-color: #E8EAEA;"></div>
                            <div style="font-size: 24px;color: #000000;text-align: right;margin-top: 20px">
                                总分:{{analyze_count.toFixed(0)}}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="详情"
                v-model="infomodal"
                :mask-closable="false"
                :footer-hide="true"
                :width="1200"
                footer-hide
            >
                <div class="elecPhysical-Infomodal">
                    <Form inline :label-width="42" class="modal-form">
                        <FormItem label="学校名称" :label-width="72">
                            <Input v-model="infomodalData.student_school" style="width:160px;" readonly/>
                        </FormItem>
                        <FormItem label="年级">
                            <Input v-model="infomodalData.student_graden" style="width:110px;" readonly/>
                        </FormItem>
                        <FormItem label="班级">
                            <Input v-model="infomodalData.student_class" style="width:110px;" readonly/>
                        </FormItem>
                        <FormItem label="姓名">
                            <Input v-model="infomodalData.student_name" style="width:80px" readonly/>
                        </FormItem>
                        <FormItem label="性别">
                            <Input v-model="infomodalData.student_gender" style="width:80px;" readonly/>
                        </FormItem>
                        <FormItem label="身份证号" :label-width="72">
                            <Input v-model="infomodalData.card_num" style="width:160px;" readonly/>
                        </FormItem>
                        <FormItem label="年龄">
                            <Input v-model="infomodalData.student_age" style="width:100px;" readonly/>
                        </FormItem>
                        <FormItem label="既往病史" :label-width="72">
                            <Input v-model="infomodalData.anamnesis" style="width:890px;" readonly/>
                        </FormItem>
                        <!--<FormItem label="民族" :label-width="50">-->
                        <!--<Input style="width:200px" v-model="infomodalData.student_nation" readonly/>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="学籍号" :label-width="72">-->
                        <!--<Input style="width:200px" v-model="infomodalData.student_code" readonly/>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="出生年月" :label-width="72">-->
                        <!--<Input style="width:200px" v-model="infomodalData.student_brith" readonly/>-->
                        <!--</FormItem>-->
                        <div style="display: inline-block;width: 550px;margin-left: 20px" v-if="infoHeight">
                            <div style="color: #000000;font-size: 20px;font-weight: 600;margin-bottom: 12px">
                                一般
                            </div>
                            <FormItem label="身高" :label-width="60">
                                <Input style="width:90px" v-model="infomodalData.body.othervalue1" readonly/>
                            </FormItem>
                            <FormItem label="体重" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.othervalue2" readonly/>
                            </FormItem>
                            <!--<FormItem label="BMI" :label-width="42">-->
                            <!--<Input style="width:90px" v-model="infomodalData.body.resultvalue" readonly/>-->
                            <!--</FormItem>-->
                            <FormItem label="得分" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.score" readonly/>
                            </FormItem>
                            <!--<FormItem label="权值" :label-width="42">-->
                            <!--<Input style="width:90px" v-model="infomodalData.body.proportion" readonly/>-->
                            <!--</FormItem>-->
                            <!--<FormItem label="加权" :label-width="42">-->
                            <!--<Input style="width:90px" v-model="infomodalData.body.weighted_score" readonly/>-->
                            <!--</FormItem>-->
                        </div>
                        <div v-for="item of infomodalData.fitnessForms" :key="item.fitness"
                             style="display: inline-block">
                            <div style="display: inline-block;width: 550px;margin-left: 20px">
                                <div style="color: #000000;font-size: 20px;font-weight: 600;margin-bottom: 12px">
                                    {{item.fitness }}
                                </div>
                                <FormItem :label="item.label" :label-width="60">
                                    <Input style="width:90px" v-model="item.resultvalue" readonly/>
                                </FormItem>
                                <FormItem label="得分" :label-width="42">
                                    <Input style="width:90px" v-model="item.score" readonly/>
                                </FormItem>
                                <!--<FormItem label="权值" :label-width="42">-->
                                <!--<Input style="width:90px" v-model="item.proportion" readonly/>-->
                                <!--</FormItem>-->
                                <FormItem label="加分" v-show="item.flag" :label-width="42">
                                    <Input style="width:90px" v-model="item.weighted_score" readonly/>
                                </FormItem>
                            </div>
                        </div>
                        <div style="display: inline-block;width: 550px;margin-left: 20px">
                            <div style="color: #000000;font-size: 20px;font-weight: 600;margin-bottom: 12px">
                                综合评分
                            </div>
                            <FormItem label="分数" :label-width="60">
                                <Input style="width:90px" :value="info_count" readonly/>
                            </FormItem>
                        </div>
                        <!--<div style="height: 100px">-->
                        <!--<div style="height: 1px;width:90%;margin:auto;background-color: #E8EAEAFF">-->
                        <!--<div style="font-size: 24px;color: #000000FF;text-align: right;padding-top: 20px">-->
                        <!--总分:{{info_count}}-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->
                    </Form>
                </div>
            </Modal>
        </div>

        <component :is='com' :id='id' @modal-close='ModalClose' :data="reportDatas"></component>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import printPhysicalReport from './printPhysicalReport';
    import {yearLists, todayYear} from '@/libs/dateUtils';
    import qs from 'qs';

    export default {
        name: 'elecPhysicalReport',
        data() {
            return {
                req: {
                    year: todayYear(),
                    area_id: '-1',
                    area_id1: '-1',
                    school_id: '-1',
                    grade_id: '-1',
                    class_id: '-1',
                    project: []
                },
                studentName: {},
                classList: [],
                gradeList: [],
                projectList: [],
                isHeight: false,
                modal: false,
                analyzeList: [],
                infomodal: false,
                sex: true,
                analyzeHeight: false,
                infoHeight: false,
                analyze_count: 0,
                info_count: 0,
                infomodalData: {
                    student_school: '',
                    student_graden: '',
                    student_class: '',
                    student_gender: '',
                    student_nation: '',
                    student_code: '',
                    student_brith: '',
                    anamnesis: '',
                    body: {
                        othervalue1: '',
                        othervalue2: '',
                        resultvalue: '',
                        score: '',
                        proportion: '',
                        weighted_score: ''
                    },
                    fitnessForms: []
                },
                columns: [],
                columns_1: [
                    // {
                    //     title: ' ',
                    //     type: 'selection',
                    //     width: 40,
                    //     align: 'center',
                    //     fixed: 'left',
                    // },
                    {
                        type: 'index',
                        width: 70,
                        title: '序号',
                        fixed: 'left',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 100,
                        key: 'year',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 130,
                        key: 'area_name'
                    },
                    {
                        title: '学校',
                        minWidth: 140,
                        key: 'school_name'
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        width: 100,
                        key: 'class_name'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name'
                    },
                    {
                        title: '年龄',
                        width: 60,
                        key: 'age'
                    }
                ],
                columns1: [
                    {
                        title: '一般',
                        children: [
                            {
                                title: '身高(cm)',
                                width: 80,
                                key: 'height'
                            },
                            {
                                title: '体重(kg)',
                                width: 80,
                                key: 'weight'
                            }
                        ]
                    },
                    {
                        title: '肺活量(ml)',
                        width: 100,
                        key: 'vital_capacity_value'
                    },
                    {
                        title: '握力(kg)',
                        width: 100,
                        key: 'grip_value'
                    },
                    {
                        title: '俯卧背起(次)',
                        width: 100,
                        key: 'back_stomach_value'
                    },

                    {
                        title: '斜身引体(次)',
                        width: 100,
                        key: 'oblique_pullups_value'
                    },
                    {
                        title: '坐位体前屈(cm)',
                        width: 130,
                        key: 'bent_forward_value'
                    },
                    {
                        title: '一分钟跳绳(次)',
                        width: 120,
                        key: 'rope_skipping_value'
                    },
                    {
                        title: '立定跳远(cm)',
                        width: 110,
                        key: 'standing_jump_value'
                    },
                    {
                        title: '一分钟仰卧起坐(女)(次)',
                        width: 170,
                        key: 'sit_up_value'
                    },
                    {
                        title: '引体向上(男)(次)',
                        width: 130,
                        key: 'pull_up_value'
                    },
                    {
                        title: '50米跑(s)',
                        width: 100,
                        key: 'run_fiftym_value'
                    },
                    {
                        title: '50米*8往返跑(min/s)',
                        width: 150,
                        key: 'runback_fiftym_value',
                        render: (h, params) => {
                            let value = params.row.runback_fiftym_value;
                            if (value) {
                                let data = Number(value);
                                let m = parseInt(data / 60);
                                let s = data % 60;
                                return h('span', null, `${m}'${s}`);
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '800米跑(女)(min/s)',
                        width: 140,
                        key: 'run_ehm_value',
                        render: (h, params) => {
                            let value = params.row.run_ehm_value;
                            if (value) {
                                let data = Number(value);
                                let m = parseInt(data / 60);
                                let s = data % 60;
                                return h('span', null, `${m}'${s}`);
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '1000米跑(男)(min/s)',
                        width: 160,
                        key: 'run_othm_value',
                        render: (h, params) => {
                            let value = params.row.run_othm_value;
                            if (value) {
                                let data = Number(value);
                                let m = parseInt(data / 60);
                                let s = data % 60;
                                return h('span', null, `${m}'${s}`);
                            }
                            return h('span', null, '');
                        }
                    }
                ],
                action_column: [
                    {
                        title: '操作',
                        key: 'operator',
                        width: 160,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer'
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
                                            src: require('@/assets/unit/infos.png')
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
                                        marginRight: 0
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
                                            src: require('@/assets/physicalFitnessTest/analyze.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '分析')
                                ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                areaList: [],
                areaList1: [],
                schoolList: [],
                yearList: [],
                heightObj: {
                    othervalue1: '',
                    othervalue2: '',
                    resultvalue: '',
                    score: '',
                    proportion: '',
                    weighted_score: ''
                },
                id: '',
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                reportDatas: [],
                is_manage: true
            };
        },
        methods: {
            renderScore(row, field, unit, flag) {
                if (flag) {
                    return h('span', null, '-');
                }
                return h('span', null, `${row[field]}${unit}`);
            },
            getSelectCondition(type) {
                this.yearList = yearLists().reverse();
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
                                this.schoolChange(this.req.school_id);
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
            },
            areaChange(value) {
                this.req.area_id1 = '-1';
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
            schoolChange(value) {
                this.req.grade_id = '-1';
                this.req.class_id = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
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
                this.req.class_id = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: value,
                        dep_id: this.req.school_id
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

                const {year, area_id, area_id1, school_id, grade_id, class_id, project} = this.req;
                const {page, size} = this.pageConfig;

                if (!project.length) {
                    this.columns = [...this.columns_1, ...this.columns1, ...this.action_column];
                } else {
                    let tmp = [];
                    project.forEach(item => {
                        if (item === '3012F15D7AEF474CB5E0CFF83671FAC5') { //BMI 0
                            tmp.unshift(this.columns1[0]);
                        } else if (item === '2793ED8F812A4928B220D5DA2A7F489C') { //肺活量 1
                            tmp.push(this.columns1[1]);
                        } else if (item === 'B2F6CDB8BC704A0A9F280C5CDA8D0019') { // 握力 2
                            tmp.push(this.columns1[2]);
                        } else if (item === 'F657424A586743F891E5D7010301E204') { //俯卧背起  3
                            tmp.push(this.columns1[3]);
                        } else if (item === '5A7FE87B74714954B649427C8BF31D56') { //斜身引体  4
                            tmp.push(this.columns1[4]);
                        } else if (item === '093C7820FD4346789DA7FF8ACB981E65') { //坐位体前屈 5
                            tmp.push(this.columns1[5]);
                        } else if (item === '257B4D2B6D934C24A880891207795B2A') { //一分钟跳绳  6
                            tmp.push(this.columns1[6]);
                        } else if (item === 'D241DD6A528F47BE9E75308A74E0EADD') { //立定跳远  7
                            tmp.push(this.columns1[7]);
                        } else if (item === '1CFEB456E8744B9E9AA42B2BAAF57A4D') { //一分钟仰卧起坐  8
                            tmp.push(this.columns1[8]);
                        } else if (item === '88ED8DA7E639489ABEF0306951A8BDC9') { //引体向上  9
                            tmp.push(this.columns1[9]);
                        } else if (item === '1E0C72B68D8947E894399EFE598F9DC3') { //50米跑    10
                            tmp.push(this.columns1[10]);
                        } else if (item === 'AF32A3AEB7C4466CB3A170D0348E16A3') { //50米*8往返跑  11
                            tmp.push(this.columns1[11]);
                        } else if (item === '6E40F3C06491405AAEBBCDB39FB43AD2') { //800米跑  12
                            tmp.push(this.columns1[12]);
                        } else if (item === '84940DA547A944FEB7935D28D52A5803') { //1000米跑 13
                            tmp.push(this.columns1[13]);
                        }
                    });
                    this.columns = [...this.columns_1, ...tmp, ...this.action_column];
                }

                let req = {};
                req.page = page;
                req.size = size;
                req.year = year;
                req.p_area = area_id === '-1' ? null : area_id;
                req.c_area = area_id1 === '-1' ? null : area_id1;
                req.school_id = school_id === '-1' ? null : school_id;
                req.grade_id = grade_id === '-1' ? null : grade_id;
                req.class_id = class_id === '-1' ? null : class_id;
                req.exam_type = 1;
                this.$ajax({
                    url: urls.elecPhysicalReport_list,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.$Message.error(data.error);
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            infos(row) {
                let obj = {};
                this.infoHeight = false;
                this.info_count = 0;
                obj.cardOrCode = row.student_code;
                obj.year = row.year + '';
                this.$ajax({ // 学校
                    url: urls.elecPhysicalReport_analyze,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        this.infomodalData = data.data[0];
                        let tempList = [];
                        let fitnessForms = data.data[0].fitnessForms || [];
                        fitnessForms.forEach(item => {
                            let tmp = {};
                            if (item.fitness.trim() === 'BMI') {
                                this.infoHeight = true;
                                this.infomodalData.body = item;
                                this.infomodalData.body.othervalue1 = item.othervalue1 + 'cm';
                                this.infomodalData.body.othervalue2 = item.othervalue2 + 'kg';
                                tmp = {
                                    fitness: item.fitness,
                                    label: '',
                                    height: item.height,
                                    weight: item.weight,
                                    score: item.score
                                };
                                this.info_count = this.info_count + item.weighted_score;
                                // tempList.push(tmp)
                                return;
                            } else if (item.fitness.trim() === '肺活量') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '肺活量',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '握力') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '握力',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '斜身引体') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '次数',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '俯卧背起') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '次数',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '坐位体前屈') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '距离',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '一分钟跳绳') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '次数',
                                    resultvalue: item.resultvalue + item.unit,
                                    flag: true,
                                    value2: '',
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '立定跳远') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '距离',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (/一分钟仰卧起坐/g.test(item.fitness.trim())) {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '次数',
                                    resultvalue: item.resultvalue + item.unit,
                                    flag: true,
                                    value2: '',
                                    score: item.score
                                };
                            } else if (/引体向上/g.test(item.fitness.trim())) {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '次数',
                                    resultvalue: item.resultvalue + item.unit,
                                    flag: true,
                                    value2: '',
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '50米跑') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '时间',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (item.fitness.trim() === '50米*8往返跑') {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '时间',
                                    resultvalue: item.resultvalue + item.unit,
                                    score: item.score
                                };
                            } else if (/800米跑/g.test(item.fitness.trim())) {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '时间',
                                    value: item.resultvalue + item.unit,
                                    flag: true,
                                    value2: '',
                                    score: item.score
                                };
                            } else if (/1000米跑/g.test(item.fitness.trim())) {
                                tmp = {
                                    fitness: item.fitness,
                                    label: '时间',
                                    resultvalue: item.resultvalue + item.unit,
                                    flag: true,
                                    value2: '',
                                    score: item.score
                                };
                            }
                            tempList.push(tmp);
                            this.info_count = this.info_count + item.weighted_score;
                        });


                        // for (let i = 0; i < this.infomodalData.fitnessForms.length; i++) {
                        //     if (this.infomodalData.fitnessForms[i].fitness === 'BMI') {
                        //         this.infoHeight = true;
                        //         this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                        //         this.infomodalData.body = this.infomodalData.fitnessForms[i];
                        //         this.infomodalData.body.othervalue1 = this.infomodalData.body.othervalue1 + 'cm';
                        //         this.infomodalData.body.othervalue2 = this.infomodalData.body.othervalue2 + 'kg';
                        //     } else {
                        //         this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                        //         this.infomodalData.fitnessForms[i].resultvalue = this.infomodalData.fitnessForms[i].resultvalue + this.infomodalData.fitnessForms[i].unit;
                        //         tempList.push(this.infomodalData.fitnessForms[i]);
                        //     }
                        // }
                        this.infomodalData.fitnessForms = tempList;
                        this.infomodalData.student_brith = this.numToDate(this.infomodalData.student_brith);
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                this.infomodal = true;
            },
            analyze(row) {
                this.analyze_count = 0;
                let obj = {};
                this.analyzeHeight = false;
                obj.cardOrCode = row.student_code;
                obj.year = row.year + '';
                this.$ajax({ // 学校
                    url: urls.elecPhysicalReport_analyze,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        let oldData = data.data[0].fitnessForms;
                        let tempData = [];
                        this.studentName = data.data[0].student_name;
                        this.sex = data.data[0].student_gender === '女';
                        for (let i = 0; i < oldData.length; i++) {
                            if (oldData[i].fitness === 'BMI') {
                                this.heightObj = oldData[i];
                                this.analyzeHeight = true;
                                this.analyze_count = this.analyze_count + oldData[i].weighted_score;
                            } else {
                                this.analyze_count = this.analyze_count + oldData[i].weighted_score;
                                tempData.push(oldData[i]);
                            }
                        }
                        tempData.forEach(item => {
                            switch (item.fitness) {
                                case '握力':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/wo.png');
                                    break;
                                case '斜身引体':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/xi.png');
                                    break;
                                case '俯卧背起':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/fu.png');
                                    break;
                                case '坐位体前屈':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/sitAndReach.png');
                                    break;
                                case '立定跳远':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/long_jump.png');
                                    break;
                                case '引体向上':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/pull_up.png');
                                    break;
                                case '一分钟仰卧起坐':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/sit_up.png');
                                    break;
                                case '一分钟跳绳':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/rope_skipping.png');
                                    break;
                                case '50米跑':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/50meters.png');
                                    break;
                                case '50米*8往返跑':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/400meters.png');
                                    break;
                                case '800米跑':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/800meters.png');
                                    break;
                                case '1000米跑':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/physicalPrepare/1000meters.png');
                                    break;
                                case 'BMI':
                                    this.heightObj = item;
                                    break;
                                case '肺活量':
                                    item.imgsrc = require('@/assets/physicalFitnessTest/lung.png');
                                    break;
                            }
                        });
                        this.analyzeList = tempData;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                this.modal = true;
            },
            numToDate(value) {
                if (!value) {
                    return '';
                }
                let t = new Date(value);
                let y = t.getFullYear();
                let m = t.getMonth() + 1;
                let d = t.getDate();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                return y + '/' + m + '/' + d;
            },
            selectionsChange(row) {
                this.reportDatas = row;
            },
            prints() {
                // 打印
                if (this.reportDatas.length !== 1) {
                    this.$Message.error('请选择一条要打印的报告');
                    return;
                }
                this.id = '';
                this.com = printPhysicalReport;
            },
            exports() {
                let data = {};
                const {year, area_id, school_id, grade_id, class_id} = this.req;
                if (year) {
                    data.fit_year = year;
                }
                if (area_id !== '-1') {
                    data.p_area = area_id;
                }
                if (school_id !== '-1') {
                    data.school_id = school_id;
                }
                if (grade_id !== '-1') {
                    data.grade_no = grade_id;
                }
                if (class_id !== '-1') {
                    data.class_no = class_id;
                }
                data.import_people = sessionStorage.getItem('user_name');
                location.href = urls.fit_export + '?' + qs.stringify(data);
            },
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
            alyClose() {
                this.$nextTick(() => {
                    this.analyzeList = [];
                });
            },
            ModalClose(flag) {
                this.com = null;
            }
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') { // 管理员 教育局
                this.is_manage = false;
                this.req.school_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition(2);
            this.search();
        },
    };
</script>

<style lang="less">
    .elecPhysical-analyze {
        display: flex;

        .report-title {
            margin-top: 15px;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #000000;
        }

        .report-value-wrapper {
            display: flex;
            overflow: auto;
            padding-left: 20px;

            .img-title {
                padding-top: 10px;
                width: 120px;
                font-size: 24px;
                font-weight: 600;
                color: #000000;
            }

            .value-unit {
                font-weight: 600;
                margin-left: 5px;
                font-size: 14px;
            }

            .report-value-content {
                padding-top: 10px;
                color: #000000;
                font-size: 14px;
            }

            .report-red-content {
                margin-top: 5px;
                color: #ed5145;
                font-size: 14px;
            }

            .normal {
                font-weight: 600;
            }

            .report-value {
                display: inline-block;
                width: 100px;
                font-size: 14px !important;
            }

            .report-error {
                font-size: 14px !important;
                color: #ed5145;
            }

            .report-normal {
                font-size: 14px !important;
                color: #299E97;
            }
        }

        .data-item {
            display: flex;
            min-height: 115px;

            img {
                width: 74px;
                height: 74px;
            }
        }
    }

    .elecPhysical-Infomodal {

        .ivu-form-inline .ivu-form-item {
            margin-right: 20px !important;
        }

        .ivu-input {
            color: rgba(0, 0, 0, 0.87);
            background-color: rgba(233, 240, 242, 1);
            cursor: not-allowed;
        }
    }

    .elecPhysicalReport {
        .project2 .ivu-select-selection div {
            max-height: 30px;
        }
    }

    .nospan {
        color: rgba(102, 102, 102, 1);
    }
</style>
