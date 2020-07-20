<template>
    <div class="content-box">
        <div class="title">体质监测数据上报</div>
        <Form class="search-form"  v-model="req" inline>
            <FormItem label="学校名称" :label-width="70">
                <i-select style="width:200px" v-model="req.dep_id" filterable @on-change="schoolChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学年" :label-width="40">
                <i-select style="width:120px" v-model="req.year">
                    <Option value="-1">全部</Option>
                    <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学期" :label-width="40">
                <i-select style="width:100px" v-model="req.term">
                    <Option value="-1">全部</Option>
                    <Option :value="1">第一学期</Option>
                    <Option :value="2">第二学期</Option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="40">
                <i-select v-model="req.grade_no" @on-change="gradeChange"
                          style="width:140px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40">
                <i-select style="width:140px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                </i-select>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" @click="appearData">
                <img src="../../../assets/unit/import.png" alt="add">&nbsp;上报
            </a>
            <a href="javascript:void(0)" class="add" @click="exports">
                <img src="../../../assets/unit/export.png" alt="download">&nbsp;导出
            </a>
            <a href="javascript:void(0)" class="add" style="float: right;">
                <img src="../../../assets/unit/download.png" alt="download">&nbsp;下载模版
            </a>
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData" @on-selection-change="selectChange"></BaseTable>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {yearLists, todayYear} from "@/libs/dateUtils";
    import qs from 'qs';

    export default {
        name: 'monitorStatisSummary',
        data() {
            return {
                req: {
                    dep_id: '-1',
                    year: todayYear(),
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
                        title: '序号',
                        width: 70,
                        type: 'index',
                        align: 'center'
                    }, {
                        title: '学校名称',
                        key: 'school_name'
                    }, {
                        title: '年级',
                        key: 'year'
                    }, {
                        title: '班级',
                        key: 'class_no'
                    }, {
                        title: '人数',
                        key: 'count'
                    },
                    {
                        title: '体检日期',
                        key: 'time'
                    },
                    {
                        title: '通知状态',
                        key: 'state',
                    }
                ],
                tableData: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                yearList: [],
                selectValue: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition() {

                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id:sessionStorage.getItem('dep_id')
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
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
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
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return;
                }
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
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let filterInfo = Object.assign({}, this.filterForm);
                if (filterInfo.year) {
                    filterInfo.year = filterInfo.year.getFullYear();
                } else {
                    filterInfo.year = null;
                }
                this.$ajax({
                    url: urls.set_objects_list,
                    data: filterInfo
                }).then((res) => {
                    if (res && res.data) {
                        this.tableData = res.data;
                    }
                });
            },
            selectChange(value) {
                this.selectValue = value;
            },
            appearData() {
                if (!this.selectValue.length) {
                    this.$Message.error('请选择要上报的数据');
                    return false;
                }
                let ids = this.selectValue.map(item => item.id);
                this.$ajax({
                    url: '',
                    data: {
                        ids: ids
                    }
                }).then(data => {
                    if (data.code === 200) {

                    } else {

                    }
                });
            },
            exports() {
                let data = {
                    dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                    term: this.req.term === '-1' ? null : this.req.term,
                    year: this.req.year === '-1' ? null : this.req.year,
                    grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                    class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                };
                window.location.href = '?' + qs.stringify(data);
            }
        },
        created(){
            this.yearList = yearLists().reverse();
            const code = sessionStorage.getItem('roleCode');
            if(code !== '999' && code !== '10100001' && code !== '10200001'){
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
                this.schoolChange(this.req.dep_id)
            }
            this.getSelectCondition();
            // this.search();
        }
    };
</script>
<style lang="less">

</style>
