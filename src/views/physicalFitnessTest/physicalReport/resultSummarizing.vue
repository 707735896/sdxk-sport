<template>
    <div class="resultSummarizing content-box clearfix">
        <div class="title">
            体测数据批量导出
        </div>
        <Divider dashed/>
        <div class="middle-content label-right">
            <Form ref="centerContent" :model="req" :label-width="110" style="width: 480px;margin-left: 250px;"
                  label-position="left">
                <FormItem label="体测学年">
                    <i-select v-model="req.fit_year" style="width:340px">
                        <i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域">
                    <i-select v-model="req.p_area" style="width:159px" @on-change="areaChange" :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.c_area" style="width:178px" @on-change="areaChange1" :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称">
                    <i-select v-model="req.school_id" filterable style="width:340px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级">
                    <i-select v-model="req.grade_no" style="width:340px" @on-change="gradeChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级">
                    <i-select v-model="req.class_no" style="width:340px">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="text-align: left;">
                    <Button type="primary" class="search-btn" @click="exports" style="width: 90px;">导出</Button>
                </FormItem>
            </Form>
            <!--<Upload action="//jsonplaceholder.typicode.com/posts/"-->
            <!--style="width: 750px;text-align: right;margin: auto">-->
            <!--<Button type="primary" class="search-btn">数据汇总</Button>-->
            <!--</Upload>-->
        </div>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {yearLists, todayYear} from '@/libs/dateUtils';
    import qs from 'qs';

    export default {
        data() {
            return {
                req: {
                    fit_year: todayYear(),
                    p_area: '-1',
                    c_area: '-1',
                    school_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    import_people: ''
                },
                areaList: [],
                areaList1: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                yearList: [],
                data_back: '[]',
                is_manage: true
            };
        },
        methods: {
            getSelectCondition() {
                this.yearList = yearLists().reverse();
                Promise.all([
                    this.$ajax({ // 区域1
                        url: urls.area_all_list,
                        data: {}
                    }),
                    this.$ajax({
                        // 学校
                        url: urls.dept_all_list,
                        data: {
                            dep_id: sessionStorage.getItem('dep_id')
                        }
                    })
                ]).then(([value1, value2]) => {
                    this.areaList = value1.data.filter((item) => item.type === 2);


                    if (this.req.c_area !== '-1') {
                        this.schoolList = value2.data.filter((item) => item.type === 2 && item.area_id === this.req.c_area);
                    } else {
                        this.schoolList = value2.data.filter((item) => item.type === 2);
                    }
                    if (!this.is_manage) {
                        let dep_id = sessionStorage.getItem('dep_id');
                        this.schoolChange(dep_id);
                        let c_area = '';

                        value2.data.forEach(item => {
                            if (item.id === dep_id) {
                                this.req.c_area = item.area_id;
                                c_area = item.area_id;
                            }
                        });

                        value1.data.forEach(item => {
                            if (item.id === c_area) {
                                this.req.p_area = item.pid;
                            }
                        });
                        this.areaList1 = value1.data;
                    }
                })

            },
            getSchoolList() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            if (this.req.c_area !== '-1') {
                                this.schoolList = data.data.filter((item) => item.type === 2 && item.area_id === this.req.c_area);
                            } else {
                                this.schoolList = data.data.filter((item) => item.type === 2);
                            }
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
            areaChange(value) {
                this.req.c_area = '-1';
                if (this.is_manage) {
                    this.req.school_id = '-1';
                    this.req.grade_no = "-1";
                    this.req.class_no = '-1';
                    this.getSchoolList();
                    this.classList = [];
                    this.gradeList = [];
                }

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
            areaChange1(value) {
                if (this.is_manage) {
                    this.req.school_id = '-1';
                    this.req.grade_no = "-1";
                    this.req.class_no = '-1';
                    this.classList = [];
                    this.gradeList = [];
                    this.getSchoolList()
                }
            },
            schoolChange(value) {
                this.req.grade_no = "-1";
                this.req.class_no = '-1';
                this.classList = [];
                if (value === "-1") {
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
                this.req.class_no = '-1';
                if (value === '-1') {
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
            exports() {
                let data = {};
                if (this.req.year) {
                    data.fit_year = this.req.year;
                }
                if (this.req.p_area !== '-1') {
                    data.p_area = this.req.p_area;
                }
                if (this.req.c_area !== '-1') {
                    data.c_area = this.req.c_area;
                }

                if (this.req.school_id !== '-1') {
                    data.school_id = this.req.school_id;
                }
                if (this.req.grade_no !== '-1') {
                    data.grade_no = this.req.grade_no;
                }
                if (this.req.class_no !== '-1') {
                    data.class_no = this.req.class_no;
                }
                data.import_people = sessionStorage.getItem('user_name');
                location.href = urls.fit_export + '?' + qs.stringify(data);
            }
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.school_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
        }
    };
</script>
<style lang="scss">
    .resultSummarizing {
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
        }

        .middle-content {
            margin: 112px 0 0 0;

            .ivu-form {
                .ivu-form-item-label {
                    position: relative !important;
                    top: -2px !important;
                    font-size: 16px !important;
                    font-family: SourceHanSansCN-Medium !important;
                    font-weight: 500 !important;
                    color: rgba(153, 153, 153, 1) !important;
                }

                .ivu-select-selected-value,
                .ivu-input {
                    font-size: 16px !important;
                    font-family: SourceHanSansCN-Medium !important;
                    font-weight: 500 !important;
                    color: rgba(0, 0, 0, 1) !important;
                }
            }
        }
    }

</style>
