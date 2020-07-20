<template>
    <div>
        <div class="content-box TubCom">
            <div class="title">
                既往结核病史和接触史名单
            </div>
            <Form class="search-form" inline :label-width="72">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:110px" v-model="filterForm.year">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="filterForm.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="filterForm.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="72">
                    <i-select v-model="filterForm.school_id" filterable style="width:150px" :disabled="!is_manage"
                              @on-change="schoolChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="44" style="margin-right: 0!important;">
                    <Select style="width:120px" v-model="filterForm.grade_no">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;" :label-width="0" >
                    <Button type="primary" class="search-btn" @click="getList">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed style="margin-top: 0;"/>
            <div class="clearfix">
                <a class="add" @click="download">
                    <img alt="add" src="../../../assets/unit/export.png">&nbsp;名单下载
                </a>
            </div>
            <BaseTable ref="selection" :columns="columns" :data="objectList"></BaseTable>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current="pageConfig.page"
                  :page-size-opts="pageConfig.opts"
                  :page-size="pageConfig.size"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import qs from 'qs';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    import AddCheckList from './addChecklist';

    export default {
        name: 'TubCom',
        data() {
            return {
                modal: false,
                reviewResult: false,
                gradeList: [],
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '区域',
                        key: 'area_name',
                        width: 260,
                    },
                    {
                        title: '学校名称',
                        key: 'school_name'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        key: 'class_name'
                    },
                    {
                        title: '学生姓名',
                        key: 'student_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render(h, params) {
                            if (params.row.gender === 1) {
                                return h('span', null, '男');
                            } else if (params.row.gender === 2) {
                                return h('span', null, '女');
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '是否住宿',
                        key: 'is_boarding',
                        render(h, params) {
                            if (params.row.is_boarding === 1) {
                                return h('span', null, '是');
                            } else if (params.row.is_boarding === 2) {
                                return h('span', null, '否');
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style:{
                                        marginRight: 0,
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
                                ])
                            ]);
                        }
                    }
                ],
                objectList: [],
                school_columns: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'school'
                    }, {
                        title: '年级',
                        key: 'grade'
                    }, {
                        title: '班级',
                        key: 'class',
                    }, {
                        title: '人数',
                        key: 'count',
                    }, {
                        title: '体检队伍',
                        key: 'team',
                    }, {
                        title: '体检时间',
                        key: 'time',
                    }
                ],
                schoolList: [],
                areaList1: [],
                areaList: [],
                yearList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                com: null,
                modalTitle: '',
                id: '',
                flag: false,
                is_manage: true,
                filterForm: {
                    area_id1: '-1',
                    area_id2: '-1',
                    school_id: '-1',
                    grade_no: '-1',
                    year: todayYear()
                },
            };
        },
        methods: {
            pageChange(page) {
                this.pageConfig.page = page;
                this.getList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
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
                            this.schoolList = data.data.filter((item) => item.type === 2);
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.filterForm.grade_no = '-1';
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
            getArea() {
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter((item) => item.type === 2);
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            areaChange(value) {
                this.filterForm.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 3 && item.pid === value);
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            getList() {
                const {year, school_id, grade_no, area_id1 } = this.filterForm;
                const {page,size} = this.pageConfig;

                this.$ajax({
                    url: urls.examination_tubAndCom_list,
                    data: {
                        year: year === '-1'? '': year,
                        school_id: school_id === '-1' ? '' : school_id,
                        grade_no: grade_no === '-1' ? '' : grade_no,
                        area_id: area_id1 === '-1'? '': area_id1,
                        // p_area:'',
                        // c_area: '',
                        page: page,
                        size: size
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.objectList = res.data;
                        this.pageConfig.total = res.totalRecords;
                    }else {
                        this.objectList = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            info(id) {
                this.com = AddCheckList;
                this.id = id;
                this.modalTitle = '既往结核病史和接触史详情';
                this.flag = true;
            },
            download() {
                let data = {
                    school_id: this.filterForm.school_id === '-1' ? '' : this.filterForm.school_id,
                    grade_no: this.filterForm.grade_no === '-1' ? '' : this.filterForm.grade_no,
                    year: this.filterForm.year,
                };
                try {
                    window.location.href = urls.examination_download_list + '?' + qs.stringify(data);
                } catch (e) {

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
            this.yearList = yearLists().reverse();
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10203001' && code !== '10200001' && code !== '10202002' && code !== '10202001' && code !== '10204001') { // 管理员, 教育局
                this.is_manage = false;
                this.filterForm.school_id = sessionStorage.getItem('dep_id');
            }
            this.getArea();
            this.getSelectCondition();
            this.getList();
        }
    };
</script>
<style lang="scss">
    .modal-form .ivu-form-item {
        margin-right: 30px !important;
    }

    .TubCom {
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .disabled span {
            color: #999999;
        }

        .editBtn:hover {
            opacity: 0.8;
        }
    }

</style>
