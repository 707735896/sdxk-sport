<template>
    <div class="classes content-box">
        <h3 class="title">体检二维码生成</h3>
        <!-- <template v-if="hasData"> -->
        <template>
            <Form inline label-position="left">
                <FormItem label="学校名称" :label-width="80">
                    <i-select v-model="req.dep_id" filterable style="width:150px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <!--<i-input v-model.trim="schoolName" readonly/>    -->
                </FormItem>
                <FormItem label="学年" :label-width="50">
                    <i-select style="width:120px" v-model="req.year">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学期" :label-width="50">
                    <i-select style="width:120px" v-model="req.term">
                        <Option value="-1">全部</Option>
                        <Option :value="1">第一学期</Option>
                        <Option :value="2">第二学期</Option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="50">
                    <i-select v-model="req.grade_no" @on-change="gradeChange"
                              style="width:120px; margin-right: 0!important;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="50">
                    <i-select v-model="req.class_no" style="width:120px; margin-right: 0!important;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <div class="operator">
                    <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
                </div>
            </Form>
            <Divider dashed/>
            <div>
                <a href="javascript:void(0)" class="add" @click="prints" style="margin-right: 45px;">
                    <img src="../../../../assets/unit/print.png" alt="add">&nbsp;打印
                </a>
            </div>
            <BaseTable center :disabled-hover='true' :columns="columns" :data="tableData"
                   @on-selection-change="selectChange"
                   :row-class-name='rowClass' :loading="loading"></BaseTable>
            <component :title="modalTitle" :is='com' :id='id' :flag="flag" :qrcodes="select"
                       @modal-close='ModalClose'></component>
            <div style="margin:0 auto; display:none;" id="qrcode2" ref="box" v-html="printHtml"></div>
        </template>
        <!-- <div v-if="!hasData" class="null">
            <div class="blank">
                <img src="../../../../assets/common/null.png" alt="">
                <div style="margin-top:20px;">暂无权限 !</div>
            </div>
        </div> -->

    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import printQRcode from './printQRcode';
    import urls from '@/service/Urls';
    import {yearLists} from "@/libs/dateUtils";
    import QRCode from 'qrcodejs2';

    export default {
        name: 'printQRcode',
        data() {
            return {
                loading: true,
                // hasData: true,
                printHtml: '',
                class_down: urls.class_down,
                orignStuList: [],
                req: {
                    dep_id: '-1',
                    year: '-1',
                    term: '-1',
                    grade_no: '-1',
                    class_no: '-1'
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 60,
                        title: '序号',

                    },
                    {
                        title: '证件号',
                        width: 180,
                        key: 'card_num'
                    },
                    {
                        title: '学号',
                        width: 140,
                        key: 'student_code'
                    },
                    {
                        title: '姓名',
                        key: 'student_name'
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '学期',
                        key: 'term',
                        render: (h, params) => {
                            return h(
                                "span",
                                null,
                                params.row.term === 1 ? "第一学期" : "第二学期"
                            );
                        }
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        key: 'class_name'
                    }
                ],
                tableData: [],
                schoolName: '',
                yearList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                select: [],
                is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,

            };
        },
        methods: {
            getSelectCondition(type) {
                this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === type);
                            if(!this.is_manage){
                                this.schoolChange(this.req.dep_id);
                            }

                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            // 二维码预览
            qrcode(code) {
                for (let j = 0; j < code.length; j++) {
                    // document.getElementById(''+code[j].id).innerHTML = ''; //置空
                    let contentStr = code[j].card_num; //二维码内容
                    let qrcode = new QRCode(document.getElementById('' + code[j].id), {
                        text: contentStr,
                        width: 150,
                        height: 150,
                        colorDark: '#000000',
                        colorLight: '#ffffff'
                    });
                }
            },
            creatQRcode(code) {
                this.$nextTick(() => {
                    this.qrcode(code);
                });

            },
            // 二维码打印
            prints() {
                if (this.select.length >= 1) {
                    this.com = printQRcode;
                    this.id = this.select[0].id;
                    this.modalTitle = '打印';
                    this.creatQRcode(this.select)
                } else {
                    this.$Message.error('请选择要打印的名单');
                }
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.search();
            },
            search() {
                this.select = [];
                this.$ajax({
                    url: urls.studentqrcode_list,
                    data: {
                        year: this.req.year === '-1' ? null : String(this.req.year),
                        term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_id: this.req.class_no === '-1' ? null : this.req.class_no,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id
                    }

                }).then((res) => {
                    if (res.code === 200) {
                        this.loading = false;
                        if (res.data.length !== 0) {
                            if (this.orignStuList.length === 0) {
                                this.orignStuList = res.data
                                this.getCondition()
                                this.gradeYear();
                            }
                            this.tableData = res.data;
                            this.schoolName = res.data[0].dep_name;
                        } else {
                            // this.hasData = false
                        }


                    } else {
                        this.data = [];
                    }
                });
            },
            // 下拉列表框组获取
            getCondition() {
                let gradeList = this.orignStuList.map(item => {
                    let obj = {}
                    obj.id = item.grade_no
                    obj.name = item.grade_name
                    return obj
                });
                let classList = this.orignStuList.map(item => {
                    let obj = {}
                    obj.id = item.class_no
                    obj.name = item.class_name
                    return obj
                })
                gradeList = this.reduceArr(gradeList)
                classList = this.reduceArr(classList)
                this.gradeList = gradeList
                this.classList = classList


            },
            // 学年
            gradeYear() {
                this.yearList = yearLists().reverse();
            },
            // 数组去重
            reduceArr(arg) {
                let hash = {};
                arg = arg.reduce((preVal, curVal) => {
                    hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
                    return preVal
                }, [])
                return arg;
            },

            selectChange(value) {
                this.select = value;
            },

            imp() {
                this.com = ImportClass;
                this.id = '';
                this.flag = false;
                this.modalTitle = '导入';
            },
            download() {

            },
            edit(id) {
                this.com = AddClass;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            schoolChange(value) {
                this.req.grade_no = "-1";
                if (value === "-1") {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if(!temp.length){
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
                if (value === '-1') {
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
            rowClass(row) {
                return row.status === 2 ? 'disabled' : '';
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            if(sessionStorage.getItem('roleCode') !== '999'){ // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }else if(sessionStorage.getItem('roleCode') !== '10201001') { // 学校管理员

            }
            this.getSelectCondition(2);
            this.search();
            // this.getCondition();
        }
    };
</script>

<style lang="less">
    .classes {
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .disabled span {
            color: #bd1b1b;
        }
    }

    .null {
        text-align: center;
        font-size: 18px;
        color: #666;

        img {
            display: block;
        }

        .blank {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%)
        }
    }
</style>
