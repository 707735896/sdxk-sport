<template>
    <div class="content-box user-import">
        <div class="title">县市学校体质监测数据批量导入</div>
        <a :href="student_import" download="体检结果导入模板.xlsx" class="add" style="position: absolute;right: 50px;margin-top: 20px">
            <img src="../../../assets/unit/download.png" alt="download">&nbsp;下载模版
        </a>
        <Divider dashed/>
        <div class="form-main">
            <!--<div class="rows">-->
                <!--<label style="display:inline-block;width: 100px;">导入负责人</label>-->
                <!--<span>{{name}}</span>-->
            <!--</div>-->
            <div class="rows">
                <Form ref="obj" :model="req" :rules="rules" inline label-position="left">
                    <div class="rows">
                        <FormItem label="导入负责人" :label-width="100" style="margin-right: 40px;" >
                            <span style="display:inline-block;width:300px;padding-top: 2px;font-size: 16px;" >{{name}}</span>
                        </FormItem>
                        <FormItem label="区域" :label-width="100" style="margin-right: 0 !important;" prop="p_area">
                            <i-select v-model="req.p_area" style="width:135px;" @on-change="areaChange">
                                <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="" :label-width="0" prop="c_area">
                            <i-select v-model="req.c_area" style="width:165px;">
                                <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                    </div>

                    <div class="rows">
                        <FormItem label="学校名称" :label-width='100' prop="school_id">
                            <i-select style="width:300px" filterable v-model="req.school_id" @on-change="schoolChange" :disabled="!is_manage">
                                <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="监测学年" :label-width='100' prop="med_year">
                            <i-select style="width:305px" v-model="req.med_year">
                                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</Option>
                            </i-select>
                        </FormItem>
                    </div>

                    <!--<div class="rows">-->
                        <!--<FormItem label="区域" :label-width="100" style="margin-right: 0 !important;" prop="p_area">-->
                            <!--<i-select v-model="req.p_area" style="width:150px;" @on-change="areaChange">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="" :label-width="0" prop="c_area">-->
                            <!--<i-select v-model="req.c_area" style="width:150px;">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="学校名称" :label-width='100' style="margin-left: 60px;" prop="school_id">-->
                            <!--<i-select style="width:300px" v-model="req.school_id" @on-change="schoolChange" :disabled="!is_manage">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                    <!--</div>-->

                    <!--<div class="rows">-->
                        <!--<FormItem label="年级-班级" :label-width='100' style="margin-right: 0 !important;" prop="grade_no">-->
                            <!--<i-select v-model="req.grade_no" style="width:150px;" @on-change="gradeChange">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="" :label-width="0" prop="class_no">-->
                            <!--<i-select v-model="req.class_no" style="width:150px;">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="监测学年" :label-width='100' style="margin-left: 60px;" prop="med_year">-->
                            <!--&lt;!&ndash;<DatePicker v-model="req.med_year" type="year" placeholder="请选择"&ndash;&gt;-->
                                        <!--&lt;!&ndash;style="width: 300px"></DatePicker>&ndash;&gt;-->
                            <!--<i-select style="width:300px" v-model="req.med_year">-->
                                <!--<Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</Option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                    <!--</div>-->

                    <!--<div class="rows">-->
                        <!--<FormItem label="医疗机构" :label-width='100' prop="hos_dep">-->
                            <!--<i-select v-model="req.hos_dep" style="width:304px">-->
                                <!--&lt;!&ndash;<i-option value="-1">全部</i-option>&ndash;&gt;-->
                                <!--<i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}-->
                                <!--</i-option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                        <!--<FormItem label="监测类型" :label-width='100' style="margin-left: 60px;" prop="med_type">-->
                            <!--<i-select v-model="req.med_type" style="width:300px">-->
                                <!--&lt;!&ndash;<Option value="-1">全部</Option>&ndash;&gt;-->
                                <!--<Option :value="1">健康体检</Option>-->
                                <!--<Option :value="2">升学体检</Option>-->
                            <!--</i-select>-->
                        <!--</FormItem>-->
                    <!--</div>-->

                    <div>
                        <FormItem label="选择文件" :label-width='100'>
                            <input type="hidden" v-model="req.filename">
                            <span slot="label"><span style="display:inline-block;width:10px;color: red;" >*</span>选择文件</span>
                            <label id="uplable" for="files">
                                <span style="font-size: 14px;">选择文件</span>
                                <input type="file" id="files" ref="file" @change="select">
                            </label>
                            <span>{{req.filename}}</span>
                        </FormItem>
                    </div>

                </Form>
            </div>
            <Button type="primary" class="search-btn" @click="search" style="float: right;margin-right: 100px;">导入</Button>
        </div>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import axios from 'axios'
    import {yearLists, todayYear} from "@/libs/dateUtils";

    export default {
        name: 'cityDataReport',
        data() {
            return {
                name: sessionStorage.getItem('sportHealthUserName'),
                req: {
                    p_area: '',
                    c_area: '',
                    school_id: '',
                    grade_no: '',
                    class_no: '',
                    hos_dep: '',
                    med_type: '',
                    med_year: todayYear(),
                    filename:''
                },
                rules: {
                    p_area: [{required: true, message: '请选择市', trigger: 'change'}],
                    c_area: [{required: true, message: '请选择区', trigger: 'change'}],
                    school_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请选择班级', trigger: 'change'}],
                    hos_dep: [{required: true, message: '请选择医疗机构', trigger: 'change'}],
                    med_type: [{required: true,type: 'number', message: '请选择体检类型', trigger: 'change'}],
                    med_year: [{required: true,type:'date', message: '请选择监测学年', trigger: 'change'}]
                    // filename:[{required: true , message: '请选择excel文件', trigger: 'change'}]
                },
                areaList: [],
                areaList1: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                hospitalList: [],
                yearList: [],
                tempFile: '',
                is_manage: true,
                student_import: urls.student_export
            };
        },
        methods: {
            getSelectCondition(type) {
                this.yearList = yearLists().reverse();
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "status": 1
                    }
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
                        type: type,
                        status: 1,
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            let arr1 = [], arr2 = [];
                            data.data.forEach((item) => {
                                if (item.type === 2) {
                                    arr1.push(item);
                                } else if (item.type === 3) {
                                    arr2.push(item);
                                }
                            });
                            this.schoolList = arr1;
                            this.hospitalList = arr2;
                        } else {
                            this.schoolList = [];
                            this.hospitalList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            select() {
                var file = this.$refs.file.files[0];
                this.tempFile = file;
                if (file) {
                    this.req.filename = file.name;
                }else {
                    this.req.filename = '';
                }
                this.$refs.file.value = '';
            },
            search() {
                this.$refs['obj'].validate(value => {
                    if (!value) {
                        return false;
                    }
                    if (this.tempFile) {
                        let arr = this.tempFile.name.split('.');
                        if (arr[arr.length - 1] !== 'xls' && arr[arr.length - 1] !== 'xlsx') {

                            this.$Message.error('请上传excel类型的文件');
                            return false;
                        }
                    }else {
                        this.$Message.error('请选择excel类型的文件');
                        return false;
                    }
                    let form = new FormData();
                    form.append('p_area', this.req.p_area);
                    form.append('c_area', this.req.c_area);
                    form.append('school_id', this.req.school_id);
                    form.append('grade_no', this.req.grade_no);
                    form.append('class_no', this.req.class_no);
                    form.append('hos_dep', this.req.hos_dep);
                    form.append('med_type', this.req.med_type);
                    form.append('med_year', this.req.med_year.getFullYear());
                    form.append('uploadFile', this.tempFile);
                    // if(file.tempFile.size / 1024 /1024 > 1){
                    //     this.$Spin.show();
                    // }
                    this.$Spin.show();
                    axios.post(urls.baseApi+urls.user_data_import, form, {
                        headers: {
                            'AuthToken': sessionStorage.getItem('token'),
                            'content-type': undefined
                        },
                        timeout: 10000,
                    }).then(data => data.data).then(data =>{
                        this.$Spin.hide();
                        if(data.code === 200){
                            this.$Message.success('体检数据导入成功');
                            this.$refs['obj'].resetFields();
                            this.req.filename = '';
                            this.$refs.file.value = '';
                            this.tempFile = '';
                        }else {
                            this.$Message.error(data.msg);
                        }
                    });
                })

            },
            areaChange(value) {
                this.req.c_area = '';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "pid":value,
                        // "status": 1
                    }
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
            schoolChange(value) {
                this.gradeList = [];
                this.classList = [];
                this.req.class_no = '';
                this.req.grade_no = '';
                // if (value === '-1') {
                //     return;
                // }
                /// =========== 所属年级
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
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
                this.req.class_no = '';
                this.classList = [];
                // if (value === '-1') {
                //     return;
                // }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        grade_no: this.req.grade_no
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
        },
        created() {
            if(sessionStorage.getItem('roleCode') !== '999'){
                this.is_manage = false;
                this.req.school_id = sessionStorage.getItem('dep_id');
                this.schoolChange(this.req.school_id)
            }
            this.getSelectCondition();
        }
    };
</script>
<style lang="less">
    .user-import {
        .ivu-input,
        .ivu-select-input,
        .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
        .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            font-size: 16px;
            font-weight: 500;
            color: rgb(51, 51, 51) !important;
        }

        .form-main {
            width: 950px;
            height: 500px;
            margin: 112px auto auto;
        }

        .rows {
            margin-bottom: 30px;
        }

        .form-main .ivu-form-item-label {
            display: inline-block;
            width: 120px;
            color: #999999;
            font-size: 18px;
        }
        #uplable{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 34px;
            padding: 6px 15px 6px;
            line-height: 23px;
            font-size: 12px;
            border-radius: 4px;
            font-weight: 400;
            text-align: center;
            touch-action: manipulation;
            background-image: none;
            white-space: nowrap;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
            background-color: #FF7B10 !important;
            color: #FEFEFE !important;
            border-color: #FF7B10 !important;
            cursor: pointer;
            #files{
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
                clip: rect(1px,1px,1px,1px);
            }
        }
    }
</style>
