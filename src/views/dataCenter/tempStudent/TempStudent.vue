<template>
    <div class="content-box TempStudent">
        <div class="title">临时名单入口</div>
        <Form class="search-form" v-model="req" inline>
            <FormItem label="学年" :label-width="40">
                <i-select style="width:120px" v-model="req.year">
                    <Option value="-1">全部</Option>
                    <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学期" :label-width="40">
                <i-select style="width:100px" v-model="req.term" @on-change="gradeChange">
                    <Option value="-1">全部</Option>
                    <Option :value="1">第一学期</Option>
                    <Option :value="2">第二学期</Option>
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
            <FormItem label="学生姓名" :label-width="80" style="margin-right: 0!important;">
                <i-select style="width:120px" v-model="req.name" filterable>
                    <i-option v-for="item of studentList" :key="item.id" :value='item.id'>{{item.student_name}}
                    </i-option>
                </i-select>
            </FormItem>
            <!--<FormItem label="学生姓名" :label-width="70">-->
            <!--<i-input v-model.trim="req.name" style="width:150px" placeholder="请输入"></i-input>-->
            <!--</FormItem>-->
            <!--<FormItem label="性别" :label-width="40">-->
            <!--<i-select style="width:100px" v-model="req.gender">-->
            <!--<i-option value="-1">全部</i-option>-->
            <!--<i-option :value="1" :key="1">男</i-option>-->
            <!--<i-option :value="2" :key="2">女</i-option>-->
            <!--</i-select>-->
            <!--</FormItem>-->
            <!--<FormItem label="住宿否" :label-width="60">-->
            <!--<i-select style="width:100px" v-model="req.is_boarding">-->
            <!--<i-option value="-1">全部</i-option>-->
            <!--<i-option :value="1" :key="1">是</i-option>-->
            <!--<i-option :value="2" :key="2">否</i-option>-->
            <!--</i-select>-->
            <!--</FormItem>-->


            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" @click="add">
                <img alt="add" :src="require('@/assets/unit/add.png')">&nbsp;新增
            </a>
            <!--<a href="javascript:void(0)" class="add" @click="trash">-->
            <!--<img :src="require('@/assets/system/role/delete.png')" alt="trash">&nbsp;-->
            <!--删除-->
            <!--</a>-->
            <div class="add" @click="getCodeDatas">
                <img alt="print" src="../../../assets/common/print.png"/>
                二维码打印
            </div>
        </div>
        <BaseTable ref="selection" :columns="columns" @on-selection-change="selectChange" :data="tableData"></BaseTable>
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
        <!--<component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>-->
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :qrcodes="printCodeDatas"
                   @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import Add from './Add';

    import {todayYear, todayTerm, yearLists} from '@/libs/dateUtils';
    import printQRcode from './printQRcode';
    import QRCode from 'qrcodejs2';

    export default {
        name: 'TempStudent',
        data() {
            return {
                req: {
                    year: todayYear(),
                    term: todayTerm(),
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    name: '',
                    // gender: '-1',
                    // is_boarding: '-1',
                },
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
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                    },
                    {
                        title: '学校名称',
                        minWidth: 150,
                        key: 'school_name'
                    },
                    {
                        title: '学年',
                        key: 'year',
                        width: 110,
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '学期',
                        key: 'term',
                        width: 110,
                        render: (h, params) => {
                            if (params.row.term === 1) {
                                return h('span', null, '第一学期');
                            } else if (params.row.term === 2) {
                                return h('span', null, '第二学期');
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '年级',
                        minWidth: 120,
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        minWidth: 120,
                        key: 'class_name'
                    },
                    {
                        title: '学生姓名',
                        minWidth: 120,
                        key: 'student_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.gender == '1') {
                                return h('span', null, '男');
                            } else if (params.row.gender == '2') {
                                return h('span', null, '女');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        width: 80,
                        render: (h, params) => {
                            if (params.row.age) {
                                return h('span', null, params.row.age);
                            } else if (params.row.card_type === 1) {
                                if (params.row.card_num) {
                                    let year = parseInt(params.row.card_num.substr(6, 4));
                                    let month = parseInt(params.row.card_num.substr(10, 2));
                                    let day = parseInt(params.row.card_num.substr(12, 2));
                                    let d = new Date().getTime() - new Date(year, month, day);
                                    return h('span', null, Math.floor(d / 1000 / 3600 / 24 / 365));
                                }
                            }
                            return h('span', null, '');
                        }
                    },
                    {
                        title: '是否住宿',
                        key: 'is_boarding',
                        width: 100,
                        render: (h, params) => {
                            if (params.row.is_boarding == '1') {
                                return h('span', null, '是');
                            } else if (params.row.is_boarding == '2') {
                                return h('span', null, '否');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 280,
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row.id);
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
                                            this.edit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/unit/edit_cover.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '编辑')
                                ]),
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
                                            this.trash(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/del.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '删除')
                                ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                yearList: yearLists().reverse(),
                schoolList: [],
                gradeList: [],
                classList: [],
                studentList: [],
                selectValue: [],
                printCodeDatas: [],
                modalTitle: '',
                is_manage: true,
                id: '',
                flag: false, // 详情时标志
                com: null
            };
        },
        methods: {
            // 生成体检二维码
            getCodeDatas() {
                console.log('QRcode');
                if (this.selectValue.length === 0) {
                    this.$Message.error('请选择要打印的学生');
                    return;
                }

                this.com = printQRcode;
                this.id = null;
                this.modalTitle = '二维码打印';
                this.printCodeDatas = this.selectValue;
                this.flag = true;
                this.creatQRcode(this.selectValue);
                this.schoolName = this.selectValue[0].school_name;
            },
            // 二维码预览
            qrcode(code) {
                console.log(code);
                for (let j = 0; j < code.length; j++) {
                    // document.getElementById(''+code[j].id).innerHTML = ''; //置空
                    let contentStr = code[j].card_num; //二维码内容
                    let qrcode = new QRCode(document.getElementById('' + code[j].id), {
                        text: contentStr,
                        width: 170,
                        height: 170,
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

            getSelectCondition() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1,
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            // this.schoolList = data.data.filter((item) => item.type === 2);
                            this.schoolList = data.data;
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
                        dep_id: this.req.dep_id,
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
            search() {
                this.selectValue = [];
                const {page, size} = this.pageConfig;
                const {year, term, dep_id, grade_no, class_no} = this.req;
                this.$ajax({
                    url: urls.temporary_list,
                    data: {
                        year: year === '-1' ? null : String(year),
                        term: term === '-1' ? null : term,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        class_no: class_no === '-1' ? null : class_no,
                        page: page,
                        size: size,
                        name: this.req.name ? this.req.name : null,
                        // gender: this.req.gender === '-1' ? null : this.req.gender,
                        // is_boarding: this.req.is_boarding === '-1' ? null : this.req.is_boarding,

                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.studentList = res.data;
                        this.pageConfig.total = res.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            add() {
                this.com = Add;
                this.id = '';
                this.modalTitle = '临时名单新增';
                this.flag = false;
            },
            info(id) {
                this.com = Add;
                this.id = id;
                this.modalTitle = '临时名单详情';
                this.flag = true;
            },
            edit(id) {
                this.com = Add;
                this.id = id;
                this.modalTitle = '临时名单编辑';
                this.flag = false;
            },
            trash(id) {
                let self = this;
                this.$confirm({
                    text: '确定删除?',
                    onOk: () => {
                        self.$ajax({
                            url: urls.temporary_del,
                            data: {
                                id: id,
                            }
                        }).then((res) => {
                            if (res.code === 200) {
                                this.$Message.success('删除成功');
                                self.search();
                            } else {
                                this.$Message.error('删除失败');
                            }
                        });
                    },
                    cancel: () => {
                        self.search();
                    }
                });
            },
            print() {
                if (!this.selectValue.length) {
                    this.$Message.error('请选择打印数据');
                    return false;
                }

                var myDoc = {
                    documents: document,
                    copyrights: '随便写 ' // 版权声明必须
                };
                console.log(getJCP());
                var jcp = getJCP();
                console.log(jcp);
                // 调用打印方法
                // jcp.print(myDoc, false); // 不弹出对话框打印
                jcp.printPreview(myDoc, false);
                console.log('001');
            },
            selectChange(value) {
                this.selectValue = value;
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
            }
        },
        created() {
            const code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10202002') {
                this.is_manage = false;
                // this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .TempStudent {
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

