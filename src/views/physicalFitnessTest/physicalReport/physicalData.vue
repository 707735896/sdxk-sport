<template>
    <div class="physicalData content-box clearfix">
        <div class="title">
            县市学校体测数据批量导入
        </div>
        <a :href="student_import" download="体测结果导入模板.xlsx" class="add"
           style="position: absolute;right: 50px;margin-top: 20px">
            <img src="../../../assets/unit/download.png" alt="download">&nbsp;下载模版
        </a>

        <Divider dashed/>
        <div class="middle-content label-right">
            <Form ref="centerContent" :model="req" :rules="rules" :label-width="110" style="width: 460px;" inline
                  label-position="left">
                <FormItem label="导入负责人">
                    <span class="leader">{{admin}}</span>
                </FormItem>
                <FormItem label="学校名称" prop="school_id">
                    <i-select style="width:300px;" filterable v-model="req.school_id" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" prop="grade_no">
                    <i-select v-model="req.grade_no" style="width:300px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" prop="class_no">
                    <i-select v-model="req.class_no" style="width:300px">
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" prop="fit_year">
                    <i-select v-model="req.fit_year" style="width:300px">
                        <i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" style="margin-right: 0 !important;">
                    <i-select v-model="req.p_area" style="width:145px" @on-change="areaChange">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="" :label-width="0">
                    <i-select v-model="req.c_area" style="width:145px;">
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="选择文件">
                    <input type="hidden" v-model="req.filename">
                    <span slot="label"><span style="display:inline-block;width:10px;color: red;">*</span>选择文件</span>
                    <label id="uplable" for="files">
                        <span style="font-size: 14px;">选择文件</span>
                        <input type="file" id="files" ref="file" @change="select">
                    </label>
                    <span>{{req.filename}}</span>
                </FormItem>
                <FormItem style="text-align: left;">
                    <Button type="primary" class="search-btn" @click="search" style="width: 90px;">导入数据</Button>
                </FormItem>
            </Form>
            <!--<Upload action="//jsonplaceholder.typicode.com/posts/"-->
            <!--style="width: 730px;text-align: right;margin: auto">-->
            <!--<Button type="primary" class="search-btn">导入数据</Button>-->
            <!--</Upload>-->
        </div>
    </div>

</template>
<script>
    import urls from '@/service/Urls';
    import axios from 'axios';
    import {yearLists, todayYear} from "@/libs/dateUtils";

    export default {
        data() {
            return {
                admin: sessionStorage.getItem('user_name'),
                req: {
                    school_id: '',
                    grade_no: '',
                    class_no: '',
                    fit_year: todayYear(),
                    p_area: '',
                    c_area: '',
                    filename: ''
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                yearList: [],
                areaList: [],
                areaList1: [],
                rules: {
                    school_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请选择班级', trigger: 'change'}],
                    fit_year: [{required: true, message: '请选择体检时间', trigger: 'change'}],
                    p_area: [{required: true, message: '请选择市', trigger: 'change'}],
                    c_area: [{required: true, message: '请选择区', trigger: 'change'}]
                },
                tempFile: null,
                student_import: urls.fit_file,
                is_manage: true
            };
        },
        methods: {
            getSchoolList() {
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
                                this.schoolChange(this.req.school_id)
                            }
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.req.grade_no = '';
                this.req.class_no = '';
                this.classList = [];
                if (value === -1) {
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
                this.req.class_no = '';
                if (!value) {
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
            areaChange(value) {
                this.req.c_area = '';
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
            select() {
                let file = this.$refs.file.files[0];
                this.tempFile = file;
                if (file) {
                    this.req.filename = file.name;
                } else {
                    this.req.filename = '';
                }
                this.$refs.file.value = '';
            },
            search() {
                this.$refs['centerContent'].validate(value => {
                    if (!value) {
                        return false;
                    }
                    if (this.tempFile) {
                        let arr = this.tempFile.name.split('.');
                        if (arr[arr.length - 1] !== 'xls' && arr[arr.length - 1] !== 'xlsx') {
                            this.$Message.error('请上传excel类型的文件');
                            return false;
                        }
                    } else {
                        this.$Message.error('请选择excel类型的文件');
                        return false;
                    }
                    let form = new FormData();
                    form.append('p_area', this.req.p_area);
                    form.append('c_area', this.req.c_area);
                    form.append('school_id', this.req.school_id);
                    form.append('grade_no', this.req.grade_no);
                    form.append('class_no', this.req.class_no);
                    form.append('fit_year', this.req.fit_year);
                    form.append('uploadFile', this.tempFile);
                    axios.post(urls.baseApi + urls.fit_upload, form, {
                        headers: {
                            'AuthToken': sessionStorage.getItem('token'),
                            'content-type': undefined
                        },
                        timeout: 10000,
                    }).then(data => data.data).then(data => {
                        if (data.code === 200) {
                            this.$Message.success('体测数据导入成功');
                            this.$refs['centerContent'].resetFields();
                            this.req.filename = '';
                            this.$refs.file.value = '';
                            this.tempFile = '';
                        } else {
                            this.$Message.error(data.msg);
                        }
                    });
                })
            }
        },
        created() {
            if (sessionStorage.getItem('roleCode') !== '999') {
                this.is_manage = false;
                this.req.school_id = sessionStorage.getItem('dep_id');
            }
            this.getSchoolList();
        }
    };
</script>
<style lang="scss">
    .physicalData {
        .ivu-select-input {
            font-size: 16px;
        }

        .ivu-form {
            position: relative;
            z-index: 100;
        }

        .download-group {
            cursor: pointer;
            text-align: right;

            img {
                margin-right: 8px;
            }

            span {
                position: relative;
                top: -5px;
                font-size: 18px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
            }
        }

        .middle-content {
            margin: 60px 0 0 0;

            .ivu-form {
                margin-left: 250px;

                .ivu-form-item-label {
                    position: relative !important;
                    top: -2px !important;
                    font-size: 16px !important;
                    font-family: SourceHanSansCN-Medium !important;
                    font-weight: 500 !important;
                    color: rgba(153, 153, 153, 1) !important;
                }

                .ivu-select-selected-value,
                .leader,
                .ivu-input {
                    font-size: 16px !important;
                    font-family: SourceHanSansCN-Medium !important;
                    font-weight: 500 !important;
                    color: rgba(0, 0, 0, 1) !important;
                }
            }

            .search-btn {
                width: 100px;
            }

        }
    }

</style>
