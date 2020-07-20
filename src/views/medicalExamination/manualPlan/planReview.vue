<template>
    <div class="content-box checkCount">
        <div class="title">学校班级人数审核</div>
        <Form class="search-form" v-model="req" inline>
            <!--<FormItem label="学校名称" :label-width="70">-->
                <!--<i-select style="width:150px" v-model="req.dep_id" filterable @on-change="schoolChange">-->
                    <!--<i-option value="-1">全部</i-option>-->
                    <!--<i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>-->
                <!--</i-select>-->
            <!--</FormItem>-->
            <!--<FormItem label="学年" :label-width="40">-->
                <!--<i-select style="width:120px" v-model="req.year" @on-change="gradeChange">-->
                    <!--<i-option value="-1">全部</i-option>-->
                    <!--<i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}-->
                    <!--</i-option>-->
                <!--</i-select>-->
            <!--</FormItem>-->
            <!--<FormItem label="学期" :label-width="40">-->
                <!--<i-select style="width:120px" v-model="req.term" @on-change="gradeChange">-->
                    <!--<Option value="-1">全部</Option>-->
                    <!--<Option :value="1">第一学期</Option>-->
                    <!--<Option :value="2">第二学期</Option>-->
                <!--</i-select>-->
            <!--</FormItem>-->
            <FormItem label="年级" :label-width="40">
                <i-select style="width:150px" v-model="req.grade_no" @on-change="gradeChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40" style="margin-right: 0!important;">
                <i-select style="width:120px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                </i-select>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" style="margin-right: 45px;" @click="doReview">
                <img src="../../../assets/unit/import.png" alt="add">&nbsp;上报
            </a>
        </div>
        <BaseTable @on-selection-change="selectChange" :columns="columns" :data="tableData"></BaseTable>
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
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {todayYear} from '@/libs/dateUtils';

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    dep_id: '',
                    // year: '-1',
                    // term: '-1',
                    grade_no: '-1',
                    class_no: '-1'
                },
                modal: false,
                reviewResult: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '学校名称',
                        key: 'school_name'
                    },
                    {
                        title: '学年',
                        key: 'year',
                        render(h, params) {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '学期',
                        key: 'term',
                        render(h, params) {
                            if(params.row.term === 1){
                                return h('span', null,  '第一学期');
                            }else if(params.row.term === 2){
                                return h('span', null, '第二学期');
                            }else {
                                return ''
                            }
                        }
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
                        title: '人数',
                        key: 'count_num'
                    }
                ],
                tableData: [],
                selectValue: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                schoolList: [],
                yearList: [],
                gradeList: [],
                classList: []
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter(item => item.type === 2);
                            this.schoolChange(this.req.dep_id)
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.req.grade_no = "-1";
                if (value === "-1") {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(({id}) => id === value);
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
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        grade_no: value
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            selectChange(value) {
                this.selectValue = value;
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.student_bao_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        // dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        year: todayYear(),
                        // term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no
                    }
                }).then((data) => {
                    if (data && data.data) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            doReview() {
                if (this.selectValue.length) {
                    let data = this.selectValue.map(item => {
                        return {
                            'class_no': item.class_no,
                            'count': item.count_num,
                            'dep_id': item.dep_id,
                            'grade_no': item.grade_no,
                            'task_id': item.task_id,
                            'term': item.term,
                            'year': item.year,
                        };
                    });
                    this.$ajax({
                        url: urls.student_bao_add,
                        data: data
                    }).then(json => {
                        if (json.code === 200) {
                            this.$Message.success('上报成功');
                            this.search();
                        }
                    });
                } else {
                    this.$Message.error('请选择数据');
                }
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
            }
        },
        created() {
            this.req.dep_id = sessionStorage.getItem('dep_id');
            this.getSelectCondition(2);//医院
            this.search();

        }
    };
</script>
<style lang="less">
    .checkCount {
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
    }
</style>
