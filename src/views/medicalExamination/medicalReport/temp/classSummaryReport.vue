
<template>
    <div class="classSummaryReport content-box">
        <h3 class="title">班级汇总报告单</h3>
        <Form class="clearfix" inline label-position="left">
            <FormItem label="区域" :label-width="44">
                <i-select v-model="req.area_id" style="width:140px" @on-change="areaChange">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学校" :label-width="44" style="margin-right: 4px!important;">
                <i-select v-model="req.school_id" style="width:240px" @on-change="schoolChange">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem :label-width="0" style="margin-right: 4px!important;">
                <i-select v-model="req.grade_id" style="width:130px" @on-change="gradeChange">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem :label-width="0">
                <i-select v-model="req.classno_id" style="width:130px">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <Table center :disabled-hover='true' border :columns="columns" :data="tableData"></Table>
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
    import urls from '../../../../service/Urls';

    export default {
        name: 'classSummaryReport',
        data() {
            return {
                req: {
                    school_id: -1,
                    grade_id: -1,
                    classno_id: -1,
                    area_id: -1,
                },
                columns: [
                    {
                        width: 100,
                        fixed: 'left',
                        title: '班级',
                        align:'center',
                        key: 'class_name',
                        // align: 'center'
                    },
                    {
                        title: '性别',
                        width: 70,
                        fixed: 'left',
                        align:'center',
                        key: 'gender',
                        // align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '学生人数',
                        key: 'allcount',
                        width: 80,
                        fixed: 'left',
                        align:'center',
                        // align: 'center'
                    },
                    {
                        title: '实检人数',
                        width: 90,
                        key: 'real_numme',
                        align:'center',
                        fixed: 'left',
                        // align: 'center'
                    },
                    {
                        title: '视力低下',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'eye_num',
                            align:'center',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'eye_per',
                            align:'center',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '沙眼',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'trachoma_num',
                            align:'center',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'trachoma_per',
                            align:'center',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '乳牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'deciduous_num',
                            align:'center',
                            // align: 'center'
                        }, {
                            title: '乳牙龋患率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per1',
                            // align: 'center'
                        }, {
                            title: '乳牙龋率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per2',
                            // align: 'center'
                        }, {
                            title: '乳牙龋失率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per3',
                            // align: 'center'
                        }, {
                            title: '乳牙龋补率%',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per4',
                            // align: 'center'
                        }, {
                            title: '乳牙龋均',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per5',
                            // align: 'center'
                        }, {
                            title: '乳牙龋齿充填率％',
                            width: 90,
                            align:'center',
                            key: 'deciduous_per6',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '恒牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'permanent_num',
                            // align: 'center'
                        }, {
                            title: '恒牙龋患率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per1',
                            // align: 'center'
                        }, {
                            title: '恒牙龋率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per2',
                            // align: 'center'
                        }, {
                            title: '恒牙龋失率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per3',
                            // align: 'center'
                        }, {
                            title: '恒牙龋补率%',
                            width: 90,
                            align:'center',
                            key: 'permanent_per4',
                            // align: 'center'
                        }, {
                            title: '恒牙龋均',
                            width: 90,
                            align:'center',
                            key: 'permanent_per5',
                            // align: 'center'
                        }, {
                            title: '恒牙龋齿充填率％',
                            width: 90,
                            align:'center',
                            key: 'permanent_per6',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '营养不良',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'malnutrition_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'malnutrition_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '超重',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'overweight_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'overweight_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '肥胖',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'fat_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'fat_per',
                            // align: 'center'
                        }]
                    },
                    {
                        title: '血压偏高',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align:'center',
                            key: 'High_blood_num',
                            // align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align:'center',
                            key: 'High_blood_per',
                            // align: 'center'
                        }]
                    }
                ],
                tableData: [
                    {
                        class_name: '三班',
                        id: "1",
                        gender: 1,
                        allcount: 1,
                        real_numme: 1,
                        eye_num: 1,
                        eye_per: '100%',
                        trachoma_num: 0,
                        trachoma_per: '0%',
                        deciduous_num: '0',
                        deciduous_per1: '0%',
                        deciduous_per2: '0%',
                        deciduous_per3: '0%',
                        deciduous_per4: '0%',
                        deciduous_per5: '0%',
                        deciduous_per6: '0%',
                        permanent_num: '0',
                        permanent_per1: '0%',
                        permanent_per2: '0%',
                        permanent_per3: '0%',
                        permanent_per4: '0%',
                        permanent_per5: '0%',
                        permanent_per6: '0%',
                        malnutrition_num: '0',
                        malnutrition_per: '0%',
                        overweight_num:'1',
                        overweight_per: '0%',
                        fat_num: '0',
                        fat_per: '0%',
                        High_blood_num: '0',
                        High_blood_per: '0%'

                    }
                ],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            areaChange(){
                this.req.school_id = -1;
                this.req.grade_id = -1;
                this.req.classno_id = -1;
                this.gradeList = [];
                this.classList = [];
                this.getSchoolList();
            },
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 学校列表
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1,
                        area_id: this.req.area_id === -1 ? null : this.req.area_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data;
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            schoolChange(value){
                if(value === -1){
                    this.gradeList = [];
                    this.req.grade_id = -1;
                    return false
                }
                this.getGradeList(value)
            },
            getGradeList(value) {
                this.$ajax({ // 年级列表
                    url: urls.grade_list,
                    data: {
                        status: 1,
                        id: value,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            gradeChange(value){
                this.req.classno_id = -1;
                if (value === -1) {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.req.school_id,
                        status: 1,
                        grade_id: value
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
                // this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    area_id: this.req.area_id === -1 ? null : this.req.area_id,
                    school_id: this.req.school_id === -1 ? null : this.req.school_id,
                    grade_id: this.req.grade_id === -1 ? null : this.req.grade_id,
                    classno_id: this.req.classno_id === -1 ? null : this.req.classno_id
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                        // this.$Message.success('数据查询成功');
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                        // this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.pageConfig.total = 0;
                    // this.$Message.error('数据查询失败');
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
        },
        created() {
            this.getSelectCondition();
            this.getSchoolList();
            // this.search();
        }
    };
</script>

<style lang="less">
    .classSummaryReport {
        .disabled span {
            color: #ccc;
        }
    }
</style>




