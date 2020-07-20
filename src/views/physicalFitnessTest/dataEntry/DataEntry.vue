<template>
    <div class="content-box data-entry">
        <div class="title">体能测试数据录入</div>
        <Form class="search-form" v-model="req" inline>
            <FormItem label="学年" :label-width="40">
                <i-select style="width:120px" v-model="req.year">
                    <Option value="-1">全部</Option>
                    <i-option v-for="item of yearList" :value="item.value" :key="item.value">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="所属区域" prop="area_id1" style="width: 350px" :label-width="70">
                <i-select v-model="req.area_id1" style="width:120px;" @on-change="areaChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
                <i-select v-model="req.area_id2" style="width:147px;" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学校名称" :label-width="70">
                <i-select style="width:150px" v-model="req.dep_id" filterable @on-change="schoolChange"
                          :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="40">
                <i-select v-model="req.grade_no" @on-change="gradeChange"
                          style="width:120px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="40">
                <i-select style="width:120px" v-model="req.class_no">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of classList" :value="item.id" :key="item.id">{{item.class_no}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="体测项" :label-width="60">
                <i-select style="width:120px" v-model="req.project">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of projectList" :key="item.id" :value='item.id'>
                        {{item.name}}
                    </i-option>
                </i-select>
            </FormItem>
            <FormItem label="学生姓名" :label-width="70" style="margin-right: 0!important;">
                <i-input v-model.trim="req.name" style="width:150px" placeholder="请输入"></i-input>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" @click="prints" v-show="down_flag">
                <img alt="add" :src="require('@/assets/common/export.png')">&nbsp;下载文本
            </a>
            <Button type="primary" class="search-btn" @click="entry()" style="float: right;">上报数据</Button>
        </div>
        <BaseTable ref="selection" :columns="columns" :data="tableData"></BaseTable>
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
    import {yearLists, todayYear} from '@/libs/dateUtils';
    // import qs from 'qs';
    let data_map = {};

    export default {
        name: 'DataEntry',
        data() {
            return {
                req: {
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    project: '-1',
                    name: ''
                },
                columns: [],
                columns1: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        key: 'year',
                        width: 100,
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        key: 'area',
                        width: 110
                    },
                    {
                        title: '学校',
                        minWidth: 150,
                        key: 'school'
                    },
                    {
                        title: '年级',
                        minWidth: 120,
                        key: 'grade_nostr'
                    },
                    {
                        title: '班级',
                        minWidth: 120,
                        key: 'class_nostr'
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
                            if (params.row.gender == 1) {
                                return h('span', null, '男');
                            } else if (params.row.gender == 2) {
                                return h('span', null, '女');
                            } else {
                                return h('span', null, '');
                            }
                        }
                    }
                ],
                columns2: [
                    {
                        title: '一般',
                        children: [
                            {
                                title: '身高(cm)',
                                minWidth: 80,
                                render: (h, params) => {
                                    let value = params.row.height;
                                    this.tableData[params.index].sg = value;
                                    let visible = this.judgeInput(params, '3012F15D7AEF474CB5E0CFF83671FAC5');
                                    if (!visible) {
                                        return h('span', null, '-');
                                    }
                                    if(params.row.status === 3 && params.row.tstatus === 2){
                                        return  h('span', null, value);
                                    }
                                    return h('i-input', {
                                        props: {
                                            value: value,
                                            maxlength: 3
                                        },
                                        on: {
                                            'on-blur': (e) => {
                                                let data = e.target.value;
                                                this.tableData[params.index].sg = data;
                                                if (data && !/^[0-9]+(\.[0-9])?$/.test(data)) {
                                                    this.$Message.error('请输入数字');
                                                    e.target.value = value;
                                                    return false;
                                                }
                                                this.tableData[params.index].sg = data;
                                                this.submitSingle(data, params.row, '3012F15D7AEF474CB5E0CFF83671FAC5', 1);
                                            }
                                        }
                                    });
                                }
                            },
                            {
                                title: '体重(kg)',
                                minWidth: 80,
                                render: (h, params) => {
                                    let value = params.row.weight;
                                    this.tableData[params.index].tz = value;
                                    let visible = this.judgeInput(params, '3012F15D7AEF474CB5E0CFF83671FAC5');
                                    if (!visible) {
                                        return h('span', null, '-');
                                    }
                                    if(params.row.status === 3 && params.row.tstatus === 2){
                                        return  h('span', null, value);
                                    }
                                    return h('i-input', {
                                        props: {
                                            value: value,
                                            maxlength: 5
                                        },
                                        on: {
                                            'on-blur': (e) => {
                                                let data = e.target.value;
                                                this.tableData[params.index].sg = data;
                                                if (data && !/^[0-9]+(\.[0-9]+)?$/.test(data)) {
                                                    this.$Message.error('请输入数字');
                                                    e.target.value = value;
                                                    return false;
                                                }
                                                this.tableData[params.index].tz = data;

                                                this.submitSingle(data, params.row, '3012F15D7AEF474CB5E0CFF83671FAC5', 2);
                                            }
                                        }
                                    });
                                }
                            }
                        ]
                    },
                    {
                        title: '肺活量(ml)',
                        key: 'gender',
                        minWidth: 100,
                        render: (h, params) => {
                            return this.renderInput(h, params, '2793ED8F812A4928B220D5DA2A7F489C', 5, 'feihuol');
                        }
                    },
                    {
                        title: '握力(kg)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, 'B2F6CDB8BC704A0A9F280C5CDA8D0019', 2, 'wl');
                        }
                    },
                    {
                        title: '坐位体前屈(cm)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            let visible = this.judgeInput(params, '093C7820FD4346789DA7FF8ACB981E65');
                            if (!visible) {
                                return h('span', null, '-');
                            }
                            // let [data] = this.getValue(params.row.courses, set_id);
                            let data = params.row['zwt'];
                            if(params.row.status === 3 && params.row.tstatus === 2){
                                return  h('span', null, data);
                            }
                            this.tableData[params.index]['093C7820FD4346789DA7FF8ACB981E65'] = data;
                            return h('i-input', {
                                props: {
                                    value: data,
                                    maxlength: 4
                                },
                                on: {
                                    'on-blur': (e) => {
                                        let value = e.target.value || '';
                                        if (value && !/^-?[0-9]+(\.[0-9])?$/.test(value)) {
                                            this.$Message.error('请输入数字');
                                            e.target.value = data;
                                            return false;
                                        }
                                        this.tableData[params.index]['093C7820FD4346789DA7FF8ACB981E65'] = value;
                                        this.submitSingle(value, params.row, '093C7820FD4346789DA7FF8ACB981E65');
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: '俯卧背起(次)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, 'F657424A586743F891E5D7010301E204', 4, 'fuwbq');
                        }
                    },
                    {
                        title: '立定跳远(cm)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, 'D241DD6A528F47BE9E75308A74E0EADD', 3, 'lidty');
                        }
                    },
                    {
                        title: '斜身引体(次)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, '5A7FE87B74714954B649427C8BF31D56', 2, 'xiesyt');
                        }
                    },
                    {
                        title: '引体向上(次)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, '88ED8DA7E639489ABEF0306951A8BDC9', 2, 'yintxs');
                        }
                    },
                    {
                        title: '一分钟仰卧起坐(次)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, '1CFEB456E8744B9E9AA42B2BAAF57A4D', 4, 'yifzywqz');
                        }
                    },
                    {
                        title: '一分钟跳绳(次)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, '257B4D2B6D934C24A880891207795B2A', 3, 'yifzts');
                        }
                    },
                    {
                        title: '50米跑(s)',
                        key: 'gender',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderDecimalInput(h, params, '1E0C72B68D8947E894399EFE598F9DC3', 5, 'fivemi');
                        }
                    },
                    {
                        title: '50*8往返跑(s)',
                        key: 'j',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderDecimalInput(h, params, 'AF32A3AEB7C4466CB3A170D0348E16A3', 6, 'fivebackmi');
                        }
                    },
                    {
                        title: '800米跑(s)',
                        key: 'j',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderDecimalInput(h, params, '6E40F3C06491405AAEBBCDB39FB43AD2', 6, 'eightmi');
                        }
                    },
                    {
                        title: '1000米跑(s)',
                        key: 'j',
                        minWidth: 80,
                        render: (h, params) => {
                            return this.renderInput(h, params, '84940DA547A944FEB7935D28D52A5803', 6, 'onemi');
                        }
                    }
                ],
                tableData: [],
                yearList: [],
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                projectList: [],
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                is_manage: true,
                down_flag: true
            };
        },
        methods: {
            renderDecimalInput(h, params, set_id, len, field) {
                let visible = this.judgeInput(params, set_id);
                if (!visible) {
                    return h('span', null, '-');
                }
                let data = params.row[field];
                if(params.row.status === 3 && params.row.tstatus === 2){
                    return  h('span', null, data);
                }
                this.tableData[params.index][set_id] = data;
                return h('i-input', {
                    props: {
                        value: data,
                        maxlength: len
                    },
                    on: {
                        'on-blur': (e) => {
                            let value = e.target.value || '';
                            this.tableData[params.index][set_id] = value;
                            if (value && !/^[0-9]+(\.[0-9]+)?$/.test(value)) {
                                this.$Message.error('请输入数字');
                                e.target.value = data;
                                return false;
                            }
                            this.tableData[params.index][set_id] = value;
                            this.submitSingle(value, params.row, set_id);
                        }
                    }
                });
            },
            renderInput(h, params, set_id, len, field) {
                let visible = this.judgeInput(params, set_id);
                if (!visible) {
                    return h('span', null, '-');
                }
                let data = params.row[field];
                if(params.row.status === 3 && params.row.tstatus === 2){
                    return  h('span', null, data);
                }
                // let [data] = this.getValue(params.row.courses, set_id);

                this.tableData[params.index][set_id] = data;
                return h('i-input', {
                    props: {
                        value: data,
                        maxlength: len
                    },
                    on: {
                        'on-blur': (e) => {
                            let value = e.target.value || '';
                            this.tableData[params.index][set_id] = value;
                            if (value && !/^[0-9]+$/.test(value)) {
                                this.$Message.error('请输入数字');
                                e.target.value = data;
                                return false;
                            }
                            this.tableData[params.index][set_id] = value;
                            this.submitSingle(value, params.row, set_id);
                        }
                    }
                });
            },
            judgeInput(params, set_id) {
                let temp_id = params.row.grade_no;
                if (params.row.gender == 1) {
                    temp_id += '_1';
                } else {
                    temp_id += '_2';
                }
                let setList = data_map[temp_id];

                let temp = {};
                for (let i = 0; i < setList.length; i++) {
                    if (setList[i].set_id === set_id) {
                        temp = setList[i];
                        break;
                    }
                }
                return !!temp.score;
            },
            getValue(data, id, flag) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].set_id === id) {
                        if (flag === 1) {
                            return [data[i].value2, i];
                        } else if (flag === 2) {
                            return [data[i].value3, i];
                        } else {
                            return [data[i].value1, i];
                        }
                    }
                }
                return [];
            },
            getSelectCondition() {
                Promise.all([
                    this.$ajax({ // 区域
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
                    this.areaList1 = value1.data.filter((item) => item.type === 2);

                    this.schoolList = value2.data.filter((item) => item.type === 2);
                    if (!this.is_manage) {
                        let dep_id = sessionStorage.getItem('dep_id');
                        this.schoolChange(dep_id);

                        let c_area = '';

                        value2.data.forEach(item => {
                            if (item.id === dep_id) {
                                this.req.area_id2 = item.area_id;
                                c_area = item.area_id;
                            }
                        });

                        value1.data.forEach(item => {
                            if(item.id === c_area){
                                this.req.area_id1 = item.pid;
                            }
                        });
                        this.areaList = value1.data;
                    }
                });
                this.$ajax({ // 体测项目
                    url: urls.elecPhysical_Para_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                    } else {
                        this.projectList = [];
                    }
                }).catch(err => {

                });
            },
            areaChange(value) {
                this.req.area_id2 = '-1';
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
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
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
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                // if(this.req.class_no !== '-1' && this.req.project === '-1'){
                //     this.down_flag = true
                // }else {
                //     this.down_flag = false
                // }
                if (this.req.project === '-1') {
                    this.columns = [...this.columns1, ...this.columns2];
                } else if (this.req.project === '3012F15D7AEF474CB5E0CFF83671FAC5') { // BMI
                    this.columns = [...this.columns1, ...this.columns2.slice(0, 1)];
                } else if (this.req.project === '2793ED8F812A4928B220D5DA2A7F489C') { //肺活量
                    this.columns = [...this.columns1, ...this.columns2.slice(1, 2)];
                } else if (this.req.project === 'B2F6CDB8BC704A0A9F280C5CDA8D0019') { // 握力
                    this.columns = [...this.columns1, ...this.columns2.slice(2, 3)];
                } else if (this.req.project === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                    this.columns = [...this.columns1, ...this.columns2.slice(3, 4)];
                } else if (this.req.project === 'F657424A586743F891E5D7010301E204') { // 俯卧背起
                    this.columns = [...this.columns1, ...this.columns2.slice(4, 5)];
                } else if (this.req.project === 'D241DD6A528F47BE9E75308A74E0EADD') { // 立定跳远
                    this.columns = [...this.columns1, ...this.columns2.slice(5, 6)];
                } else if (this.req.project === '5A7FE87B74714954B649427C8BF31D56') { // 斜身引体
                    this.columns = [...this.columns1, ...this.columns2.slice(6, 7)];
                } else if (this.req.project === '88ED8DA7E639489ABEF0306951A8BDC9') { // 引体向上
                    this.columns = [...this.columns1, ...this.columns2.slice(7, 8)];
                } else if (this.req.project === '1CFEB456E8744B9E9AA42B2BAAF57A4D') { // 仰卧起坐
                    this.columns = [...this.columns1, ...this.columns2.slice(8, 9)];
                } else if (this.req.project === '257B4D2B6D934C24A880891207795B2A') { // 一分钟跳绳
                    this.columns = [...this.columns1, ...this.columns2.slice(9, 10)];
                } else if (this.req.project === '1E0C72B68D8947E894399EFE598F9DC3') { // 50米跑
                    this.columns = [...this.columns1, ...this.columns2.slice(10, 11)];
                } else if (this.req.project === 'AF32A3AEB7C4466CB3A170D0348E16A3') { // 50米*8往返跑
                    this.columns = [...this.columns1, ...this.columns2.slice(11, 12)];
                } else if (this.req.project === '6E40F3C06491405AAEBBCDB39FB43AD2') { // 800米跑
                    this.columns = [...this.columns1, ...this.columns2.slice(12, 13)];
                } else if (this.req.project === '84940DA547A944FEB7935D28D52A5803') { // 1000米跑
                    this.columns = [...this.columns1, ...this.columns2.slice(13, 14)];
                }
                const {year, dep_id, grade_no, class_no, name, area_id1, area_id2} = this.req;
                const {page, size} = this.pageConfig;
                let data = {
                    year: year === '-1' ? null : year,
                    p_area: area_id1 === '-1' ? null : area_id1,
                    c_area: area_id2 === '-1' ? null : area_id2,
                    school_id: dep_id === '-1' ? null : dep_id,
                    grade_no: grade_no === '-1' ? null : grade_no,
                    class_no: class_no === '-1' ? null : class_no,
                    student_name: name ? name : null,
                    page: page,
                    size: size
                };
                Promise.all([
                    this.$ajax({url: urls.getProPlan_list}),
                    this.$ajax({url: urls.data_entry_list, data: data})
                ]).then(value => {
                    let json = value[0].data || [];
                    json.forEach(item => {
                        if (item.gender === '男') {
                            data_map[`${item.grade_id}_1`] = item.set_list;
                        } else if (item.gender === '女') {
                            data_map[`${item.grade_id}_2`] = item.set_list;
                        }
                    });
                    let res = value[1];
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.pageConfig.total = res.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }

                });
            },
            prints() {
                if (this.req.class_no === '-1') {
                    this.$Message.error('请选择具体的班级');
                    return false;
                }

                let data = {};
                if (this.req.name) {
                    data.name = this.req.name;
                }
                if (this.req.dep_id !== '-1') {
                    data.dep_id = this.req.dep_id;
                }
                if (this.req.year !== '-1') {
                    data.year = this.req.year;
                }
                if (this.req.grade_no !== '-1') {
                    data.grade_no = this.req.grade_no;
                }
                if (this.req.class_no !== '-1') {
                    data.class_no = this.req.class_no;
                }

                // window.location.href = urls.export_no_student + "?" + qs.stringify(data)
            },
            entry() {
                const {year, dep_id, grade_no, class_no} = this.req;
                // if (class_no === '-1') {
                //     this.$Message.warning('请选择到班级进行提交数据');
                //     return false;
                // }
                let data = {
                    fit_year: year,
                    school_id: dep_id === '-1' ? null : dep_id,
                    grade_no: grade_no === '-1' ? null : grade_no,
                    class_no: class_no === '-1' ? null : class_no
                };
                this.$ajax({
                    url: urls.data_submit,
                    data: data
                }).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('数据上报成功');
                    } else {
                        this.$Message.error('数据上报失败');
                    }
                });
            },
            submitSingle(value, row, set_id, flag) {
                let data = {
                    'class_id': row.class_no,
                    'grade_id': row.grade_no,
                    'school_id': row.school_id,
                    'set_id': set_id,
                    'student_id': row.student_id,
                    student_code: row.student_code,
                    'student_name': row.student_name,
                    'value1': value,
                    'year': row.year
                };

                if (flag === 1) { // 身高

                    let tz = this.tableData[row['_index']].weight;
                    if (tz) {
                        tz = Number(tz);
                    }
                    data.value2 = value;
                    data.value3 = tz;

                    if (value && tz) {
                        data.value1 = (tz / (Number(value) / 100) / (Number(value) / 100)).toFixed(1);
                    } else {
                        data['value1'] = '';
                    }

                } else if (flag === 2) {
                    let sg = this.tableData[row['_index']].height;
                    if (sg) {
                        sg = Number(sg);
                    }
                    data.value2 = sg;
                    data.value3 = value;
                    if (value && sg) {
                        data.value1 = (value / (sg / 100) / (sg / 100)).toFixed(1);
                    } else {
                        data['value1'] = '';
                    }
                }
                this.$ajax({
                    url: urls.data_update,
                    data: data
                }).then(res => {
                    if (res.code !== 200) {
                        this.$Message.error('数据提交失败，请重试。');
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
            }
        },
        beforeMount(){
            data_map = {};
        },
        created() {
            this.yearList = yearLists().reverse();
            this.columns = [...this.columns1, ...this.columns2];
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001') {
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }

            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .data-entry {
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
