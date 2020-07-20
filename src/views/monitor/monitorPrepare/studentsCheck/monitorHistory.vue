<template>
    <div class="content-box chexkStudentList">
        <div class="title">体质监测名单</div>
        <Form class="search-form" v-model="req" inline>
            <FormItem label="学年" :label-width="40">
                <i-select style="width:120px" v-model="req.year">
                    <Option value="-1">全部</Option>
                    <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学校名称" :label-width="70">
                <i-select style="width:150px" v-model="req.dep_id" filterable @on-change="schoolChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="40">
                <i-select v-model="req.grade_no" @on-change="gradeChange"
                          style="width:120px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40" style="margin-right: 0!important;">
                <i-select style="width:120px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                </i-select>
            </FormItem>
            <FormItem label="姓名" :label-width="70">
                <i-input v-model.trim="req.name" style="width:150px" placeholder="请输入"></i-input>
            </FormItem>
            <FormItem label="状态" :label-width="40">
                <i-select style="width:100px" v-model="req.status">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1" :key="1">启用</i-option>
                    <i-option :value="2" :key="2">禁用</i-option>
                </i-select>
            </FormItem>
            <!-- <FormItem label="住宿否" :label-width="60">
                <i-select style="width:100px" v-model="req.is_boarding">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1" :key="1">是</i-option>
                    <i-option :value="2" :key="2">否</i-option>
                </i-select>
            </FormItem> -->

            <!--<FormItem label="学期" :label-width="40">-->
            <!--<i-select style="width:100px" v-model="req.term" @on-change="gradeChange">-->
            <!--<Option value="-1">全部</Option>-->
            <!--<Option :value="1">第一学期</Option>-->
            <!--<Option :value="2">第二学期</Option>-->
            <!--</i-select>-->
            <!--</FormItem>-->

            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <div class="clearfix" style="height:50px">
<!--            <a href="javascript:void(0)" class="add" @click="proQr">-->
<!--                二维码生成-->
<!--            </a>-->
            <!-- <a href="javascript:void(0)" class="add" @click="add">
                <img alt="add" src="@/assets/unit/add.png">&nbsp;新增
            </a>
            <a href="javascript:void(0)" class="add" @click="trash">
                <img src="@/assets/system/role/delete.png" alt="trash">&nbsp;
                删除
            </a>
            <a href="javascript:void(0)" class="add" @click="imports">
                <img src="@/assets/unit/import.png" alt="upload">&nbsp;导入
            </a> -->
            <!--<a href="javascript:void(0)" class="add" @click="submits">-->
            <!--<img src="@/assets/medicalExamination/submit.png" alt="submits">&nbsp;校队提交-->
            <!--</a>-->
            <!-- <a :href="student_info_down1" class="add" style="position: absolute;right: 180px" download="监测学生名单.xlsx">
                <img src="@/assets/unit/download.png" alt="download">&nbsp;<span
                    style="position: relative;top:-4px;">下载名单</span>
            </a> -->
            <a href="javascript:void(0)" class="add" @click="getCodeDatas" style="margin-top: 10px;">
                <img :src="require('@/assets/common/print.png')" alt="print">&nbsp;
                二维码打印
            </a>
            <span @click="downloadNames" class="add" style="position: absolute;right: 180px">
                <img src="@/assets/unit/download.png" alt="upload">&nbsp;<span
                style="position: relative;">下载名单</span>
            </span>
            <span @click="uploadStudent" class="add" style="position: absolute;right: 50px">
                <img src="@/assets/unit/upload.png" alt="upload">&nbsp;<span
                style="position: relative;">上传数据</span>
            </span>
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData" @on-selection-change="selectChange"></BaseTable>
        <div class="page">
            <Page
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
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :qrcodes="printCodeDatas"
                   @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import printQRcode from './printQRcode';
    import AddCheckList from './addChecklist';
    // import importStudent from './importStudent';
    import {yearLists, todayYear} from '@/libs/dateUtils';
    import qs from 'qs';
    import QRCode from 'qrcodejs2'

    export default {
        name: 'schedule',
        data() {
            return {
                student_info_down1: urls.student1,
                student_info_down2: urls.student2,
                req: {
                    name: '',
                    status: '-1',
                    // is_boarding: '-1',
                    year: todayYear(),
                    // term: '-1',
                    grade_no: '-1',
                    dep_id: '-1',
                    class_no: '-1'
                },
                printCodeDatas: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                columns: [
                    {
                        type: 'selection',
                        align: 'center',
                        width: 60,
                        // fixed: 'left'
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '学校名称',
                        // minWidth: 130,
                        key: 'school_name'
                    },
                    {
                        title: '学年',
                        key: 'year',
                        // width: 100,
                        render(h, params) {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    // {
                    //     title: '学期',
                    //     key: 'term',
                    //     width: 110,
                    //     render(h, params) {
                    //         if(params.row.term === 1){
                    //             return h('span', null,  '第一学期');
                    //         }else if(params.row.term === 2){
                    //             return h('span', null, '第二学期');
                    //         }else {
                    //             return ''
                    //         }
                    //     }
                    // },
                    {
                        title: '年级',
                        // minWidth: 100,
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        // minWidth: 60,
                        key: 'class_name',
                        render(h, params) {
                            return h('span', params.row.class_name ? params.row.class_name : '--');
                        }
                    },
                    // {
                    //     title: '学号',
                    //     width: 180,
                    //     key: 'student_code'
                    // },
                    {
                        title: '姓名',
                        // minWidth: 120,
                        key: 'student_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        // width: 80,
                        render(h, params) {
                            return h('span', null, params.row.gender == 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        // width: 80
                    },
                    // {
                    //     title: '证件类型',
                    //     key: 'card_type',
                    //     width: 80,
                    //     render(h, params) {
                    //         return h('span', null, params.row.card_type === 1 ? '身份证' : '护照');
                    //     }
                    // },
                    // {
                    //     title: '身份证号',
                    //     width: 180,
                    //     key: 'card_num'
                    // },
                    // {
                    //     title: '户籍类型',
                    //     key: 'household_type',
                    //     width: 80,
                    //     render(h, params) {
                    //         return h('span', null, params.row.household_type === 1 ? '城镇' : '农村');
                    //     }
                    // },
                    {
                        title: '住宿否',
                        key: 'is_boarding',
                        // width: 90,
                        render(h, params) {
                            return h('span', null, params.row.is_boarding == 1 ? '是' : '否');
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        render: (h, params) => {
                            if (params.row.isSchedule === 1) {
                                return h('span', {
                                    style: {
                                        color: '#515a6e'
                                    }
                                }, '已排程');
                            }
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.status, params.row.student_name);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        // fixed: 'right',
                        // align:'center',
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row.student_id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
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
                                // h('span', {
                                //     attrs: {
                                //         class: 'editBtn'
                                //     },
                                //     style:{
                                //         display: 'inline-block',
                                //         cursor: 'pointer',
                                //         marginRight: '0'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.edit(params.row.id);
                                //         }
                                //     }
                                // }, [
                                //     h('img', {
                                //         style: {
                                //             marginRight: '4px'
                                //         },
                                //         attrs: {
                                //             src: require('@/assets/unit/edit_cover.png')
                                //         }
                                //     }),
                                //     h('span', {
                                //         style: {
                                //             position: 'relative',
                                //             top: '-4px'
                                //         }
                                //     }, '编辑')
                                // ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                yearList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                selectValue: [],
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                localYear: ''
            };
        },
        methods: {
            // 生成体检二维码
            getCodeDatas() {
                console.log('QRcode')
                let self = this;
                if(this.selectValue.length === 0) {
                    this.$Message.error('请选择要打印的学生');
                    return;
                }
                console.log(this.selectValue);
                this.com = printQRcode;
                // this.id = null;
                this.modalTitle = '打印';
                this.printCodeDatas = this.selectValue;
                this.flag = true;
                this.creatQRcode(this.selectValue)
                this.schoolName = this.selectValue[0].school_name;
            },
            // 二维码预览
            qrcode(code) {
                for (let j = 0; j < code.length; j++) {
                    // document.getElementById(''+code[j].id).innerHTML = ''; //置空
                    let contentStr = code[j].card_num; //二维码内容
                    let qrcode = new QRCode(document.getElementById('' + code[j].id), {
                        text: contentStr,
                        width: 120,
                        height: 120,
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
            selectChange(value) {
                this.selectValue = value;
            },
            // 下载名单
            downloadNames() {
                let data = {
                    name: this.req.name,
                    status: this.req.status === '-1' ? null : Number(this.req.status),
                    year: this.req.year === '-1' ? null : this.req.year
                };
                window.location.href = urls.monitorStudent_downLoad + '?' + qs.stringify(data);
            },
            proQR(){

            },
            getSelectCondition() {
                this.yearList = yearLists().reverse();
                // this.req.year = '-1';
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1,
                        dep_id: this.req.dep_id
                    }
                })
                    .then(data => {
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
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    this.gradeList = [];
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
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id ? this.req.dep_id : null,
                        // year: this.req.year ? this.req.year : null,
                        // term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: value,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            // 名单列表
            search() {
                this.selectValue = [];
                this.$ajax({
                    url: urls.monitorStudent_list,
                    data: {
                        name: this.req.name ? this.req.name : null,
                        status: this.req.status === '-1' ? null : this.req.status,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                        year: this.req.year === '-1' ? null : this.req.year + ''
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.pageConfig.total = res.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            info(id) {
                this.com = AddCheckList;
                this.id = id;
                this.modalTitle = '详情';
                this.flag = true;
            },
            trash() {
                if (!this.selectValue.length) {
                    this.$Message.error('请选择名单');
                    return false;
                }
                let data = [];
                this.selectValue.map(item => {
                    data.push(item.id);
                });
                this.$ajax({
                    url: urls.proofreading_status,
                    data: {
                        status: 0,
                        ids: data,
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.$Message.success('删除成功');
                        this.search();
                    } else {
                        this.$Message.error('删除失败');
                    }
                });
            },
            // 启用/禁用
            switch(id, status, code) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该监测名单？';
                    msg1 = '禁用学生' + code + '成功';
                    msg2 = '禁用学生' + code + '失败';
                } else {
                    data.status = 1;
                    text = '确定启用该监测名单？';
                    msg1 = '启用学生' + code + '成功';
                    msg2 = '启用学生' + code + '失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.monitorStudent_state,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.search();
                            } else {
                                self.$Message.error(msg2);
                            }
                        }).catch(() => {
                            self.$Message.error(msg2);
                        });
                    },
                    cancel: function () {
                        self.tableData = [];
                        self.search();
                    }
                });
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
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            },
            uploadStudent() {
                this.$ajax({
                    url: urls.monitorStudent_upload,
                    data: {year: this.localYear}
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success(data.result);
                    } else if (data.code === 505) {
                        // this.$Message.error(data.error);
                        let self = this;
                        this.$confirm({
                            text: '该学校已上传,是否更新数据?',
                            onOk: function () {
                                self.$ajax({
                                    url: urls.monitorStudent_update,
                                    data: {
                                        year: self.req.year === '-1' ? null : self.req.year + ''
                                    }
                                }).then((res) => {
                                    if (res.code === 200) {
                                        self.$Message.success('更新成功');
                                        self.search();
                                    } else {

                                    }
                                });
                            },
                            cancel: function () {
                                return;
                            }
                        });


                    } else {
                        this.$Message.error(data.error);

                    }

                }).catch(err => {


                });
            }
        },
        created() {
            this.yearList = yearLists().reverse();
            this.localYear = todayYear();
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .chexkStudentList {
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .disabled span {
            color: #999999;
        }
    }
</style>
