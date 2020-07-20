<template>
    <div class="summaryreport content-box" style="height: 100%;">
        <h3 class="title">体检报告单汇总</h3>
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
                    <FormItem label="体检类型" :label-width="70">
                        <i-select v-model="req.type" style="width:120px" @on-change="tableBtnShow">
                            <i-option :value='1'>健康体检</i-option>
                            <i-option :value='2'>升学体检</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="体检项目" :label-width="70">
                        <i-select v-model="req.project" style="width:120px" @on-change="projectChange">
                            <i-option v-for="item of projectList" :key="item.id" :value='item.id'
                                      @click.native="getFirPro(item.value)">{{item.value}}
                            </i-option>
                        </i-select>
                        <i-select class="autoWidth" v-model="req.project_son"
                                  style="min-width:140px;max-height: 34px;overflow-y: auto;" multiple
                                  @on-change="tableBtnShow">
                            <i-option v-for="item of secProjectList" :key="item" :value='item'>{{item}}</i-option>
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
                    <FormItem label="户籍类型" :label-width="70">
                        <i-select v-model="req.household_type" style="width:80px" @on-change="tableBtnShow">
                            <i-option :value="-1">全部</i-option>
                            <i-option :value='1'>城市</i-option>
                            <i-option :value='2'>农村</i-option>
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
            v-model="model"
            :width="1200"
            title="报表"
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
    import field from '@/config/field';
    import trendColumn from './trend';

    let count_map = new Map();
    // 引入 ECharts 主模块
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/toolbox');
    export default {
        name: 'summaryReport',
        data() {
            return {
                loading: true,
                model: false,
                req: {
                    year: todayYear(),
                    type: 1,
                    project: '8EE7B19DFAC74C7E898E983785800A0A',
                    project_son: [],
                    area_id: '81D5B0F79E014C83E050007F010062EE',
                    area_id2: -1,
                    dep_id: -1,
                    grade_no: -1,
                    class_no: -1,
                    gender: -1,
                    minAge: -1,
                    maxAge: 19,
                    household_type: -1,
                },
                // 表格表头渲染
                columns: [],
                //固定表头
                columns1: [
                    {
                        width: 100,
                        title: '体检类型',
                        align: 'center',
                        key: 'medical_type',
                        render: (h, params) => {
                            return h('span', params.row.medical_type === 1 ? '健康体检' : '升学体检');
                        }
                    },
                    {
                        width: 80,
                        // fixed: 'left',
                        title: '户籍类型',
                        align: 'center',
                        key: 'household_type',
                        render: (h, params) => {
                            return h('span', params.row.household_type === 1 ? '城镇' : params.row.household_type === 2 ? '农村' : '全部');
                        }
                    },
                    {
                        minWidth: 140,
                        // fixed: 'left',
                        title: '区域',
                        align: 'center',
                        key: 'area_id',
                        render: (h, params) => {
                            return h('span', params.row.area_id ? params.row.area_id : '全部');
                        }
                    },
                    {
                        minWidth: 140,
                        // fixed: 'left',
                        title: '学校',
                        align: 'center',
                        key: 'school_id',
                        render: (h, params) => {
                            return h('span', params.row.school_id ? params.row.school_id : '全部');
                        }
                    },
                    {
                        width: 120,
                        // fixed: 'left',
                        title: '年级',
                        align: 'center',
                        key: 'garde_no',
                        render: (h, params) => {
                            return h('span', params.row.garde_no ? params.row.garde_no : '全部');
                        }
                    },
                    {
                        width: 100,
                        // fixed: 'left',
                        title: '班级',
                        align: 'center',
                        key: 'class_no',
                        render: (h, params) => {
                            return h('span', params.row.class_no ? params.row.class_no : '全部');
                        }
                    },
                    {
                        width: 100,
                        // fixed: 'left',
                        title: '年龄',
                        align: 'center',
                        key: 'age',
                        render: (h, params) => {
                            return h('span', params.row.age ? params.row.age : '全部');
                        }
                    },
                    {
                        title: '性别',
                        width: 70,
                        // fixed: 'left',
                        align: 'center',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', params.row.gender === 1 ? '男' : params.row.gender === 2 ? '女' : params.row.gender == null ? '全部' : params.row.gender);
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
                // 表格数据
                tableData: [],
                yearList: yearLists().reverse(),
                typeList: [],
                areaList: [],
                areaList1: [],
                //一级体检项目
                tjPro1: '形体',
                projectList: [],
                secProjectList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                downloadLoading: false,
                tableBtnFlag: false,
                myChart: null,
                is_manage: true,
                tmp: [],
                data_back: ''
            };
        },
        methods: {
            // 体检项目
            getFirPro(arg) {
                this.tjPro1 = arg;
            },
            tableBtnShow() {
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
                        document.getElementById('exportExcel').download = '汇总报表' + '.xls';//自定义文件名
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

                // this.$refs.table.exportCsv({
                //     filename: 'The original data'
                // });
                // this.downloadLoading = true

            },
            // 生成报表
            openModel() {
                this.ddata();
                let tmpArr = trendColumn;
                //全选体检项目 --- 表头
                if (!this.tjPro1) {
                    let tmp = tmpArr.map(item => item.children);
                    let arr = [];
                    tmp.forEach(item => {
                        item.forEach(val => {
                            arr.push(val);
                        });
                    });
                    this.columns = [...this.columns1, ...arr];
                } else {
                    tmpArr = tmpArr.filter(item => item.title === this.tjPro1);
                    let cols = tmpArr[0].children;
                    //二级体检项目多选 --- 表头
                    if (this.req.project_son.length) {
                        let keywords = this.req.project_son;
                        let temp = cols.filter(item => {
                            return keywords.includes(item.title);
                        });
                        this.columns = [...this.columns1, ...temp];
                    } else {
                        //一级体检项目单选 --- 表头
                        this.columns = [...this.columns1, ...cols];
                    }
                }
                this.model = true;
            },
            // 下拉菜单列表
            getSelectCondition() {

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

                /// ===========获取下拉列表查询条件
                let type1 = 0;
                let type2 = 0;
                if (this.req.type === 1) {
                    type1 = 1;
                    type2 = 0;
                } else {
                    type1 = 0;
                    type2 = 1;
                }
                this.$ajax({ // 体检项目
                    url: urls.get_first_phyItem,
                    data: {
                        is_health: type1,
                        is_upper: type2
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                        if (data.data.length) {
                            this.projectChange(this.req.project);
                        }
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
            // 二级体检项目
            projectChange(val) {
                this.tableBtnFlag = false;
                this.req.project_son = [];
                let d = val;
                if (val === -1) {
                    this.tjPro1 = '';
                    d = '';
                }
                if (val === 'f8845b0393d64726a9cc269d25ded5fd') {
                    this.secProjectList = ['心', '肝', '脾', '肺'];
                    return false;
                }
                if (val === 'd1477eb2c08546c98bc46d71ede96c65') {
                    this.secProjectList = ['胸部X线检查'];
                    return false;
                }
                this.$ajax({
                    url: urls.get_second_phyItem + `?item_id=${d}`,
                }).then(data => {
                    if (data.code === 200) {
                        this.secProjectList = data.data;
                    } else {
                        this.secProjectList = [];
                    }
                });
            },
            search() {
                const {year, type, project, area_id, area_id2, household_type, dep_id, grade_no, class_no, gender, minAge, maxAge} = this.req;

                if (Number(minAge) > Number(maxAge)) {
                    this.$Message.error('最小年龄不能大于最大年龄');
                    return false;
                }

                // 获取统计报表数据

                let req = {
                    'year': year,
                    'medical_type': type,
                    'physicalName': project,
                    'area_pid': area_id,
                    'area_id': area_id2 === -1 ? null : area_id2,
                    'household_type': household_type === -1 ? null : household_type,
                    'school_id': dep_id === -1 ? null : dep_id,
                    'grade_no': grade_no === -1 ? null : grade_no,
                    'class_no': class_no === -1 ? null : class_no,
                    'gender': gender === -1 ? 0 : gender,
                    'agestar': minAge === -1 ? 0 : minAge,
                    'ageend': maxAge
                };

                this.$ajax({
                    url: urls.reports_summary,
                    // url: urls.chart,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        this.tableBtnFlag = true;
                        this.data_back = JSON.stringify(data);
                        if (this.myChart) {
                            this.myChart.dispose();
                            this.myChart = null;
                        }
                        this.myChart = echarts.init(this.$refs.myChart);
                        let opt;
                        // // 处理数据 ----start-------
                        // if (req.grade_no && req.class_no) {
                        //     opt = this.dealdata1(); // 选择班级，只显示一个班级
                        // } else if (req.grade_no && !req.class_no) {
                        //     opt = this.dealdata2(); // 不选班级，选择年级 ，显示一个年级
                        // } else {
                        //     opt = this.dealdata3(data.data); // 显示所有年级
                        // }
                        // // 处理数据 ----end-------
                        opt = this.dealData(data.data); // 显示所有年级
                        this.drawLine(opt);
                    }
                });

            },
            dealData(data) {
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
                let proTemp = this.projectList.filter(item => item.id === this.req.project);
                let ya = [{  // y 轴
                    name: '数值',
                    type: 'value'
                }];
                try {
                    ya = [{
                        name: proTemp[0].value,
                        type: 'value'
                    }];
                } catch (e) {
                    console.log(e);
                }
                /* ============ y 轴 ========== end  */

                /* ============ 数据项 ==========  start  */
                let lengend = []; // lengend项
                if (!this.req.project_son.length) { // 没有选择子项，默认全部
                    lengend = this.secProjectList.slice();
                } else {
                    lengend = this.req.project_son.slice();
                }
                /* ============ 数据项 ==========  end  */


                let series = [];
                lengend.map((inneritem, index) => {
                    let sw = [[]];
                    sw = this.deal(data, inneritem);
                    series.push({
                        name: inneritem,
                        type: 'bar',
                        // stack: inneritem.name,
                        data: sw[0]
                    });
                });
                return {
                    legend: {
                        data: lengend.slice()
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
                                let val1 = params[i].value ? params[i].value : 0;
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
                    }
                    // color: ['#51C8CB', '#526F99', '#F5C4C7', '#EAC688', '#66C4DD', '#E79387', '#5B95A2'],
                };
            },
            deal(data, label) {
                count_map.clear();
                let sw = [[]];
                data.map((item, index) => {
                    let all = {
                        d1: 0
                    };
                    let obj = {
                        d1: 0
                    };
                    count_map.set(this.tmp[index], 0);
                    if (item.resMedicalReportDatas) {
                        let count = 0;
                        obj = item.resMedicalReportDatas.reduce((inits, cur) => {
                            let co = cur.medical_count ? cur.medical_count : 0;
                            count += co;
                            let d = cur[field[label.trim()]] ? cur[field[label.trim()]] : 0;
                            return {
                                d1: inits['d1'] + d
                            };
                        }, all);
                        count_map.set(this.tmp[index], count);
                    }

                    sw[0].push(obj['d1']);
                });
                return sw;
            },
            // 统计堆叠图
            drawLine(opt) {
                // 绘制图表
                this.myChart.setOption(opt);
            },
            ddata() {
                let data = {};
                if (!this.data_back) {
                    this.tableData = [];
                    return;
                }
                data = JSON.parse(this.data_back);
                let {sex, class_name, grade_name, school_name, area_name} = data;
                let tmpDatas = data.data;
                //总计
                let is_this = this;
                let allTol = {
                    age: null,
                    area_id: area_name,
                    garde_no: grade_name,
                    class_no: class_name,
                    school_id: school_name,
                    id: null,
                    // term:null,
                    year: this.req.year,
                    gender: '总计',
                    medical_type: this.req.type,
                    household_type: this.req.household_type,

                    medical_count: 0,
                    cz_count: 0,
                    cz_proportion: 0,
                    fbly_count: 0,
                    fbly_proportion: 0,
                    fp_count: 0,
                    fp_proportion: 0,
                    g_count: 0,
                    g_proportion: 0,
                    jb_count: 0,
                    jb_proportion: 0,
                    jhjssy_count: 0,
                    jhjssy_proportion: 0,
                    jmy_count: 0,
                    jmy_proportion: 0,
                    js_count: 0,
                    js_proportion: 0,
                    jz_count: 0,
                    jz_proportion: 0,
                    lbj_count: 0,
                    lbj_proportion: 0,
                    p_count: 0,
                    p_proportion: 0,
                    ps_count: 0,
                    ps_proportion: 0,
                    qb_count: 0,
                    qb_proportion: 0,
                    qh_count: 0,
                    qh_proportion: 0,
                    qs_count: 0,
                    qs_proportion: 0,
                    sg_count: 0,
                    sg_proportion: 0,
                    sjyc_count: 0,
                    sjyc_proportion: 0,
                    slbl1_count: 0,
                    slbl1_proportion: 0,
                    slbl2_count: 0,
                    slbl2_proportion: 0,
                    slbl3_count: 0,
                    slbl3_proportion: 0,
                    student_count: 0,
                    sy_count: 0,
                    sy_proportion: 0,
                    sz_count: 0,
                    sz_proportion: 0,
                    szch_count: 0,
                    szch_proportion: 0,
                    tb_count: 0,
                    tb_proportion: 0,
                    xb_count: 0,
                    xb_proportion: 0,
                    xbx_count: 0,
                    xbx_proportion: 0,
                    xl_count: 0,
                    xl_proportion: 0,
                    xlu_count: 0,
                    xlu_proportion: 0,
                    xypd_count: 0,
                    xypd_proportion: 0,
                    xypg_count: 0,
                    xypg_proportion: 0,
                    xzzy_count: 0,
                    xzzy_proportion: 0,
                    ys_count: 0,
                    ys_proportion: 0,

                    yz_count: 0,
                    yz_proportion: 0,
                    fjhkyzzz_count: 0,
                    fjhkyzzz_proportion: 0,
                    fjhmqjcz_count: 0,
                    fjhmqjcz_proportion: 0,
                    xhdb_count: 0,
                    xhdb_proportion: 0,

                    pf_count: 0,
                    pf_proportion: 0,
                    ggn_count: 0,
                    ggn_proportion: 0,
                    cl_count: 0,
                    cl_proportion: 0,
                };
                let trendArr = [];
                tmpDatas.forEach(item => {
                    // let stepTol = item;
                    let stepTol = {
                        age: null,
                        area_id: item.areaId,
                        garde_no: item.garde_no,
                        class_no: item.class_no,
                        school_id: item.schoolId,
                        id: null,
                        // term:null,
                        year: is_this.req.year,
                        gender: '小计',
                        medical_type: is_this.req.type,
                        household_type: is_this.req.household_type,

                        medical_count: 0,
                        cz_count: 0,
                        cz_proportion: 0,
                        fbly_count: 0,
                        fbly_proportion: 0,
                        fp_count: 0,
                        fp_proportion: 0,
                        g_count: 0,
                        g_proportion: 0,
                        jb_count: 0,
                        jb_proportion: 0,
                        jhjssy_count: 0,
                        jhjssy_proportion: 0,
                        jmy_count: 0,
                        jmy_proportion: 0,
                        js_count: 0,
                        js_proportion: 0,
                        jz_count: 0,
                        jz_proportion: 0,
                        lbj_count: 0,
                        lbj_proportion: 0,
                        p_count: 0,
                        p_proportion: 0,
                        ps_count: 0,
                        ps_proportion: 0,
                        qb_count: 0,
                        qb_proportion: 0,
                        qh_count: 0,
                        qh_proportion: 0,
                        qs_count: 0,
                        qs_proportion: 0,
                        sg_count: 0,
                        sg_proportion: 0,
                        sjyc_count: 0,
                        sjyc_proportion: 0,
                        slbl1_count: 0,
                        slbl1_proportion: 0,
                        slbl2_count: 0,
                        slbl2_proportion: 0,
                        slbl3_count: 0,
                        slbl3_proportion: 0,
                        student_count: 0,
                        sy_count: 0,
                        sy_proportion: 0,
                        sz_count: 0,
                        sz_proportion: 0,
                        szch_count: 0,
                        szch_proportion: 0,
                        tb_count: 0,
                        tb_proportion: 0,
                        xb_count: 0,
                        xb_proportion: 0,
                        xbx_count: 0,
                        xbx_proportion: 0,
                        xl_count: 0,
                        xl_proportion: 0,
                        xlu_count: 0,
                        xlu_proportion: 0,
                        xypd_count: 0,
                        xypd_proportion: 0,
                        xypg_count: 0,
                        xypg_proportion: 0,
                        xzzy_count: 0,
                        xzzy_proportion: 0,
                        ys_count: 0,
                        ys_proportion: 0,

                        yz_count: 0,
                        yz_proportion: 0,
                        fjhkyzzz_count: 0,
                        fjhkyzzz_proportion: 0,
                        fjhmqjcz_count: 0,
                        fjhmqjcz_proportion: 0,
                        xhdb_count: 0,
                        xhdb_proportion: 0,

                        pf_count: 0,
                        pf_proportion: 0,
                        ggn_count: 0,
                        ggn_proportion: 0,
                        cl_count: 0,
                        cl_proportion: 0,
                    };

                    item.resMedicalReportDatas.forEach(val => {
                        // 小计
                        stepTol.student_count += val.student_count;
                        stepTol.medical_count += val.medical_count;
                        stepTol.cz_count += val.cz_count;
                        stepTol.cz_proportion = ((stepTol.cz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.fbly_count += val.fbly_count;
                        stepTol.fbly_proportion = ((stepTol.fbly_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.fp_count += val.fp_count;
                        stepTol.fp_proportion = ((stepTol.fp_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.g_count += val.g_count;
                        stepTol.g_proportion = ((stepTol.g_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.jb_count += val.jb_count;
                        stepTol.jb_proportion = ((stepTol.jb_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.jhjssy_count += val.jhjssy_count;
                        stepTol.jhjssy_proportion = ((stepTol.jhjssy_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.jmy_count += val.jmy_count;
                        stepTol.jmy_proportion = ((stepTol.jmy_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.js_count += val.js_count;
                        stepTol.js_proportion = ((stepTol.js_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.jz_count += val.jz_count;
                        stepTol.jz_proportion = ((stepTol.jz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.lbj_count += val.lbj_count;
                        stepTol.lbj_proportion = ((stepTol.lbj_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.p_count += val.p_count;
                        stepTol.p_proportion = ((stepTol.p_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.ps_count += val.ps_count;
                        stepTol.ps_proportion = ((stepTol.ps_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.qb_count += val.qb_count;
                        stepTol.qb_proportion = ((stepTol.qb_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.qh_count += val.qh_count;
                        stepTol.qh_proportion = ((stepTol.qh_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.qs_count += val.qs_count;
                        stepTol.qs_proportion = ((stepTol.qs_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.sg_count += val.sg_count;
                        stepTol.sg_proportion = ((stepTol.sg_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.sjyc_count += val.sjyc_count;
                        stepTol.sjyc_proportion = ((stepTol.sjyc_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.slbl1_count += val.slbl1_count;
                        stepTol.slbl1_proportion = ((stepTol.slbl1_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.slbl2_count += val.slbl2_count;
                        stepTol.slbl2_proportion = ((stepTol.slbl2_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.slbl3_count += val.slbl3_count;
                        stepTol.slbl3_proportion = ((stepTol.slbl3_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.sy_count += val.sy_count;
                        stepTol.sy_proportion = ((stepTol.sy_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.sz_count += val.sz_count;
                        stepTol.sz_proportion = ((stepTol.sz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.szch_count += val.szch_count;
                        stepTol.szch_proportion = ((stepTol.szch_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.tb_count += val.tb_count;
                        stepTol.tb_proportion = ((stepTol.tb_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xb_count += val.xb_count;
                        stepTol.xb_proportion = ((stepTol.xb_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xbx_count += val.xbx_count;
                        stepTol.xbx_proportion = ((stepTol.xbx_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xl_count += val.xl_count;
                        stepTol.xl_proportion = ((stepTol.xl_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xlu_count += val.xlu_count;
                        stepTol.xlu_proportion = ((stepTol.xlu_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xypd_count += val.xypd_count;
                        stepTol.xypd_proportion = ((stepTol.xypd_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xypg_count += val.xypg_count;
                        stepTol.xypg_proportion = ((stepTol.xypg_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xzzy_count += val.xzzy_count;
                        stepTol.xzzy_proportion = ((stepTol.xzzy_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.ys_count += val.ys_count;
                        stepTol.ys_proportion = ((stepTol.ys_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.yz_count += val.yz_count;
                        stepTol.yz_proportion = ((stepTol.yz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.fjhkyzzz_count += val.fjhkyzzz_count;
                        stepTol.fjhkyzzz_proportion = ((stepTol.fjhkyzzz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.fjhmqjcz_count += val.fjhmqjcz_count;
                        stepTol.fjhmqjcz_proportion = ((stepTol.fjhmqjcz_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.xhdb_count += val.xhdb_count;
                        stepTol.xhdb_proportion = ((stepTol.xhdb_count * 100) / stepTol.medical_count).toFixed(2);

                        stepTol.pf_count += val.pf_count;
                        stepTol.pf_proportion = ((stepTol.pf_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.ggn_count += val.ggn_count;
                        stepTol.ggn_proportion = ((stepTol.ggn_count * 100) / stepTol.medical_count).toFixed(2);
                        stepTol.cl_count += val.cl_count;
                        stepTol.cl_proportion = ((stepTol.cl_count * 100) / stepTol.medical_count).toFixed(2);

                        trendArr.push(val);
                    });
                    // 总计
                    allTol.student_count += stepTol.student_count;
                    allTol.medical_count += stepTol.medical_count;
                    allTol.cz_count += stepTol.cz_count;
                    allTol.cz_proportion = ((allTol.cz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.fbly_count += stepTol.fbly_count;
                    allTol.fbly_proportion = ((allTol.fbly_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.fp_count += stepTol.fp_count;
                    allTol.fp_proportion = ((allTol.fp_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.g_count += stepTol.g_count;
                    allTol.g_proportion = ((allTol.g_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.jb_count += stepTol.jb_count;
                    allTol.jb_proportion = ((allTol.jb_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.jhjssy_count += stepTol.jhjssy_count;
                    allTol.jhjssy_proportion = ((allTol.jhjssy_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.jmy_count += stepTol.jmy_count;
                    allTol.jmy_proportion = ((allTol.jmy_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.js_count += stepTol.js_count;
                    allTol.js_proportion = ((allTol.js_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.jz_count += stepTol.jz_count;
                    allTol.jz_proportion = ((allTol.jz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.lbj_count += stepTol.lbj_count;
                    allTol.lbj_proportion = ((allTol.lbj_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.p_count += stepTol.p_count;
                    allTol.p_proportion = ((allTol.p_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.ps_count += stepTol.ps_count;
                    allTol.ps_proportion = ((allTol.ps_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.qb_count += stepTol.qb_count;
                    allTol.qb_proportion = ((allTol.qb_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.qh_count += stepTol.qh_count;
                    allTol.qh_proportion = ((allTol.qh_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.qs_count += stepTol.qs_count;
                    allTol.qs_proportion = ((allTol.qs_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.sg_count += stepTol.sg_count;
                    allTol.sg_proportion = ((allTol.sg_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.sjyc_count += stepTol.sjyc_count;
                    allTol.sjyc_proportion = ((allTol.sjyc_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.slbl1_count += stepTol.slbl1_count;
                    allTol.slbl1_proportion = ((allTol.slbl1_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.slbl2_count += stepTol.slbl2_count;
                    allTol.slbl2_proportion = ((allTol.slbl2_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.slbl3_count += stepTol.slbl3_count;
                    allTol.slbl3_proportion = ((allTol.slbl3_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.sy_count += stepTol.sy_count;
                    allTol.sy_proportion = ((allTol.sy_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.sz_count += stepTol.sz_count;
                    allTol.sz_proportion = ((allTol.sz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.szch_count += stepTol.szch_count;
                    allTol.szch_proportion = ((allTol.szch_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.tb_count += stepTol.tb_count;
                    allTol.tb_proportion = ((allTol.tb_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xb_count += stepTol.xb_count;
                    allTol.xb_proportion = ((allTol.xb_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xbx_count += stepTol.xbx_count;
                    allTol.xbx_proportion = ((allTol.xbx_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xl_count += stepTol.xl_count;
                    allTol.xl_proportion = ((allTol.xl_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xlu_count += stepTol.xlu_count;
                    allTol.xlu_proportion = ((allTol.xlu_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xypd_count += stepTol.xypd_count;
                    allTol.xypd_proportion = ((allTol.xypd_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xypg_count += stepTol.xypg_count;
                    allTol.xypg_proportion = ((allTol.xypg_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xzzy_count += stepTol.xzzy_count;
                    allTol.xzzy_proportion = ((allTol.xzzy_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.ys_count += stepTol.ys_count;
                    allTol.ys_proportion = ((allTol.ys_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.yz_count += stepTol.yz_count;
                    allTol.yz_proportion = ((allTol.yz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.fjhkyzzz_count += stepTol.fjhkyzzz_count;
                    allTol.fjhkyzzz_proportion = ((allTol.fjhkyzzz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.fjhmqjcz_count += stepTol.fjhmqjcz_count;
                    allTol.fjhmqjcz_proportion = ((allTol.fjhmqjcz_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.xhdb_count += stepTol.xhdb_count;
                    allTol.xhdb_proportion = ((allTol.xhdb_count * 100) / allTol.medical_count).toFixed(2);

                    allTol.pf_count += stepTol.fjhkyzzz_count;
                    allTol.pf_proportion = ((allTol.pf_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.ggn_count += stepTol.fjhmqjcz_count;
                    allTol.ggn_proportion = ((allTol.ggn_count * 100) / allTol.medical_count).toFixed(2);
                    allTol.cl_count += stepTol.xhdb_count;
                    allTol.cl_proportion = ((allTol.cl_count * 100) / allTol.medical_count).toFixed(2);

                    if (item.sex === 0) {
                        trendArr.push(stepTol);
                    }
                });
                trendArr.push(allTol);
                this.tableData = trendArr;
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001' && code !== '10205001' && code !== '10204001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
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
            window.onresize = null;
            // window.removeEventListener("resize", () => {});
            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
            }
        }
    };
</script>

<style lang="less">
    .summaryreport {
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

