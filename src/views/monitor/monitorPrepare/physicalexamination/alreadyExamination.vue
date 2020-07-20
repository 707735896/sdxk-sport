<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="checkExamination"
                :mask-closable="false"
                @on-cancel="close"
                footer-hide
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Form label-position="top" ref="obj" :model="obj" :rules="rules" inline>
                    <FormItem label="区域" prop="year" style="width: 300px;margin-right: 90px!important">
                            <i-select v-model="area_id" style="width:130px" @on-change="areaChange">
                            <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        <i-select v-model="area_id2" style="width:140px" @on-change="searchChange">
                            <i-option :value="-1">全部</i-option>
                            <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        
                    </FormItem>
                    <FormItem label="学校名称" prop="code" style="width: 300px;margin-right: 0!important;">
                         <i-select style="width:300px;" v-model="obj.school_id" @on-change="searchChange">
                        <Option :value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                        </i-option>
                    </i-select>
                    </FormItem>
                </Form>
            </div>
            <span class="addschool" v-if="isPrint === 1" @click="prints">
                <img src="../../../../assets/unit/print.png" alt="print">
                <span>打印</span>
            </span>
            <span class="addschool" @click="trash">
                <img src="../../../../assets/unit/delet.png" alt="delet">
                <span>删除</span>
            </span>
            <i-table center :disabled-hover='true' size="small" :height="400" :columns="columns" :data="tableData" @on-selection-change="selectionChange"></i-table>
            <!-- <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div> -->
            <!-- 体质抽测 -->
        <Modal
                v-model="model"
                :width="820"
                title="体质抽测详情"
                class="physicalExamination"
                :mask-closable="false"
                footer-hide
                class-name="vertical-center-modal"
        >
            <div class="schoolName">{{schoolName}}</div>
            <div class="allStuCate">
                <div class="dataCenter">
                    <div v-if ="maleDatas.length !== 0" class="manNames" style="flex:1;">
                        <h3>男生</h3>
                        <div class="stunames">
                            <div class="item" v-for="item in maleDatas" :key="item.id" style="margin-right: 4px;">{{item.student_name}}</div>
                            
                        </div>
                    </div>
                    <div v-if ="femaleDatas.length !== 0" class="womanNames" style="flex:1;">
                        <h3>女生</h3>
                        <div class="stunames">
                             <div class="item" v-for="item in femaleDatas" :key="item.id" style="margin-right: 4px;">{{item.student_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box" style="height:30px"></div>
        </Modal>
        </Modal>
        <component :is='com' :id='id_modal' @modal-close='close' :data="reportDatas"></component>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import printExaminationReports from './printNames';
    import {yearLists,todayYear} from "@/libs/dateUtils";
    export default {
        name: 'addTestPlan',
        props: ['id', 'title', 'flag','isPrint'],
        data() {
            return {
                schoolName:'',
                model: false,
                id_modal: [],
                com: null,
                reportDatas:[],
                area_id: '81D5B0F79E014C83E050007F010062EE',
                area_id2: -1,
                areaList: [],
                areaList1: [],
                obj: {
                    year: null,
                    // code: '',
                    school_id: -1,

                },
                rules: {
                    year: [{required: true, message: '请输入体测年份', trigger: 'blur'}],
                    code: [{required: true, message: '请输入体测计划代号', trigger: 'blur'}],
                },
                columns:[
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '区域',
                        key: 'area_name'
                    },
                    {
                        title: '学校',
                        key: 'school_name'
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 80,
                        render: (h, params) => {
                            if (this.flag) {
                                return '';
                            }
                            return h('span', {
                                attrs: {
                                    class: 'delete'
                                },
                                on: {
                                    click: () => {
                                        this.infos(params.row);
                                    }
                                }
                            }, '详情');
                        }
                    }
                ],//编辑页
                tableData: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    school_id: '',
                    grade_id: '',
                    class_id: '',
                    population: null
                },
                tablerules: {
                    school_id: [{required: true, message: '请选择监测学校', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择监测年级', trigger: 'change'}],
                    class_id: [{required: true, message: '请选择监测班级', trigger: 'change'}],
                    population: [{required: true,type:'number', message: '请输入监测人数', trigger: 'blur'}],
                },
                schoolList: [],
                localYear:'',
                selectionValue: [],
                maleDatas:[],
                femaleDatas:[]

            };
        },
        methods: {
            prints() {
                // 打印
                if(this.selectionValue.length === 0) {
                    this.$Message.error('请选择要打印的报告');
                    return;
                }
                this.id_modal = this.selectionValue;
                // console.log(this.id_modal)
                this.com = printExaminationReports;
            },
            infos(row) {
                this.maleDatas = [];
                this.femaleDatas = [];
                let $this = this
                this.model = true;
                this.$ajax({
                    url: urls.monitorStu_all_stu,
                    data: {
                        dep_ids:[row.dep_id],
                        year: this.localYear
                    }
                }).then(data => {
                    if (data.code === 200) {
                        let tmpData = data.data;
                        this.schoolName = tmpData[0].school_name
                        tmpData[0].monStuList.forEach(item => {
                            if(item.gender == 1) {
                                this.maleDatas.push(item)
                            }else if(item.gender == 2) {
                                this.femaleDatas.push(item)
                            }
                        });
                    } else {
                        this.maleDatas = [];
                        this.femaleDatas = [];
                    }
                }).catch(err => {
                    this.maleDatas = [];
                    this.femaleDatas = [];
                });
            },
            getSelectCondition() {
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
                this.areaChange(this.area_id)
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id:sessionStorage.getItem('dep_id')}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            searchChange() {
                this.search()
            },
            // 区域变化
            areaChange(value) {
                this.tableBtnFlag = false;
                this.area_id2 = -1;
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
                this.search()
            },
            
            close() {
                this.com = null;
                this.$emit('modal-close');
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.dep_id);
                });
            },
            // 批量删除
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的名单');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除名单？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.monitorStu_delete,
                                data: {
                                    dep_ids: self.selectionValue,
                                    year: self.localYear
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    // console.log(data)
                                    self.$Message.success('删除成功');
                                    self.search();
                                } else {
                                    self.$Message.error('删除失败');
                                }
                            })
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            // tableclose() {
            //     this.tableModal = false;
            // },
            // 列表数据
            search() {
                this.selectionValue = [],

                this.$ajax({
                    url: urls.monitorStu_AllList,
                    data: {
                        area_id: this.area_id2 === -1? null :this.area_id2,
                        pid: this.area_id,
                        dep_id: this.obj.school_id === -1 ?null:this.obj.school_id,
                        year:this.localYear,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
        },
        created() {
            this.localYear = todayYear()
            this.getSelectCondition()
            this.disabled = !!this.flag;
            
                this.search();
            
        }
    };
</script>
<style lang="less">
    .checkExamination {
        .ivu-modal-body {
            padding: 18px 28px 100px;
            overflow-y: auto;
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .img {
            /*width: 104px;*/
            img {
                display: block;
                width: 100%;
            }
        }
        .ivu-upload {
            display: block !important;
            width: 100% !important;
            padding: 6px 10px;
            text-align: center;
            cursor: pointer;
        }
        .addschool {
            display: inline-block;
            margin-bottom: 12px;
            font-size: 16px;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
            img {
                position: relative;
                top: 4px
            }
        }
        .ivu-form-item {
            margin-right: 0 !important;
        }
        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .ivu-table td, .ivu-table th {
            height: 36px;
        }
        .delete {
            display: inline-block;
            color: #FF7200;
            padding: 4px 8px;
            cursor: pointer;
        }
        .delete:hover {
            background: ghostwhite;
        }
        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }
        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
    .addProjectObj {
        .ivu-modal {
            .ivu-form-inline .ivu-form-item {
                margin-right: 22px !important;
            }
        }
    }

    .studentModal2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }
        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
    .physicalExamination {
        .ivu-modal-body {
            overflow-y: auto!important;
            max-height: 750px!important;
        }
        .schoolName {
            text-align: center;
            margin-top: 6px;
        }
        .allStuCate {
            min-height: 480px;
            width: 100%;
            position: relative;
            margin-top: 30px;
            padding: 0 76px;
            box-sizing: border-box;
            .operator {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%)
            }
            .dataCenter {
                display: flex;
                align-content: center;
                justify-content: center;
                .stunames {
                    margin-top: 10px;
                    .item {
                       min-width: 70px;
                        padding: 0 8px;
                        height: 36px;
                        background-color: #DDE5E7;
                        text-align: center;
                        line-height: 34px;
                        display: inline-block;
                        margin-bottom: 8px;
                    }
                }
                 
            }
        }
    }
</style>

