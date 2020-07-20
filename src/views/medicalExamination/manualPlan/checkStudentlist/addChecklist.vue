<template>
    <div>
        <Modal
            :title="title"
            :value="true"
            class="addCheckLists"
            :mask-closable="false"
            :footer-hide="flag"
            @on-cancel="close"
            :width="800"
        >
            <Form inline ref="obj" :model="obj" :rules="rules" label-position="top" class="modal-form">
                <FormItem label="学校名称" prop="dep_id">
                    <i-select style="width:150px" v-model="obj.dep_id" filterable @on-change="schoolChange"
                              :disabled="flag || !is_manage">
                        <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" prop="year">
                    <i-select style="width:170px" v-model="obj.year" :disabled="flag">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                    <!--<DatePicker type="year" v-model="obj.year" :disabled="flag" format="yyyy" @on-change="gradeChange"-->
                    <!--style="width: 150px" placeholder="请选择"></DatePicker>-->
                </FormItem>
                <FormItem label="学期" prop="term">
                    <i-select style="width:150px" v-model="obj.term" :disabled="flag">
                        <Option :value="1">第一学期</Option>
                        <Option :value="2">第二学期</Option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_no">
                    <i-select style="width:160px" v-model="obj.grade_no" :disabled="flag" @on-change="gradeChange">
                        <i-option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" prop="class_no">
                    <i-select style="width:150px" v-model="obj.class_no" :disabled="flag">
                        <i-option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学籍号" prop="student_code">
                    <i-input style="width:170px" :maxlength="19" :disabled="flag" v-model.trim="obj.student_code"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="学生姓名" prop="student_name">
                    <i-input style="width:150px" :maxlength="20" :disabled="flag" v-model.trim="obj.student_name"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select style="width:160px" v-model="obj.gender" :disabled="flag">
                        <i-option :value="1">男</i-option>
                        <i-option :value="2">女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="户籍类型" prop="household_type">
                    <i-select style="width:150px" v-model="obj.household_type" :disabled="flag">
                        <Option :value="1">城镇</Option>
                        <Option :value="2">农村</Option>
                    </i-select>
                </FormItem>
                <FormItem label="是否住宿" prop="is_boarding">
                    <i-select style="width:170px" v-model="obj.is_boarding" :disabled="flag">
                        <Option :value="1">是</Option>
                        <Option :value="2">否</Option>
                    </i-select>
                </FormItem>
                <FormItem label="证件类型" prop="card_type">
                    <i-select style="width:150px" v-model="obj.card_type" :disabled="flag"
                              @on-change="(value)=>this.card_flag = value === 1">
                        <Option :value="1">身份证</Option>
                        <Option :value="2">护照</Option>
                        <!--<Option :value="3">户口簿</Option>-->
                    </i-select>
                </FormItem>
                <FormItem v-if="card_flag" label="证件号" prop="card_num" style="margin-bottom: 26px;">
                    <i-input style="width:160px" v-model.trim="obj.card_num" key="1"
                             :maxlength="18" :disabled="flag" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem v-if="!card_flag" label="证件号" prop="card_num1" style="margin-bottom: 26px;">
                    <i-input style="width:160px" :disabled="flag" v-show="!card_flag" v-model.trim="obj.card_num1"
                             key="2"
                             :maxlength="9" placeholder="请输入"></i-input>
                </FormItem>

                <div class="type">既往结核病史和接触史</div>
                <div class="type-child">1、既往结核病史(含肺外结核)</div>
                <RadioGroup v-model="disease.past_medical" @on-change="radioChange">
                    <Radio label="是" :disabled="flag"></Radio>
                    <span style="color: red;font-size: 20px;vertical-align: middle" v-show="showOrHide">*</span>
                    <DatePicker type="date" format="yyyy/MM/dd" v-model="disease.past_time" :disabled="flag"
                                style="width: 120px!important;"></DatePicker>&nbsp;&emsp;&emsp;&emsp;&emsp;
                    <Radio label="否" :disabled="flag"></Radio>
                </RadioGroup>
                <div class="type-child">2、家庭成员、原同班师生、原同宿舍学生有无结核患病者?</div>
                <RadioGroup v-model="disease.friend_have">
                    <Radio label="是" :disabled="flag"></Radio>
                    <Radio label="否" :disabled="flag"></Radio>
                </RadioGroup>
                <div class="type-child" style="margin-left: 20px">若有，是否与患者密切接触?</div>
                <RadioGroup v-model="disease.have_touch">
                    <Radio label="是" :disabled="flag"></Radio>
                    <Radio label="否" :disabled="flag"></Radio>
                </RadioGroup>
                <div class="type-child">3、肺结核可疑症状，主要症状(具有其中一项即为肺结核可疑症状者)</div>
                <CheckboxGroup>
                    <Checkbox :disabled="flag" v-model="disease.cough_expect" label="咳嗽或咳痰大于2周"></Checkbox>
                    <Checkbox :disabled="flag" v-model="disease.hemoptysis_blood" label="咳血或血痰"></Checkbox>
                </CheckboxGroup>
                <div class="type-child" style="margin-left: 20px">其他常见症状</div>
                <CheckboxGroup>
                    <Checkbox :disabled="flag" v-model="disease.thorax_unwell" label="胸痛、胸闷及气短"></Checkbox>
                    <Checkbox :disabled="flag" v-model="disease.low_thermal_again" label="反复低热"></Checkbox>
                    <Checkbox :disabled="flag" v-model="disease.night_sweat" label="盗汗"></Checkbox>
                    <Checkbox :disabled="flag" v-model="disease.slim_down" label="消瘦或体重下降"></Checkbox>
                    <Checkbox :disabled="flag" v-model="disease.weak" label="乏力、拿欲减退"></Checkbox>
                </CheckboxGroup>
                <div class="type-child" style="margin-left: 20px">其他</div>
                <i-input type="textarea" v-model.trim="disease.other_unwell" :disabled="flag"
                         style="margin-left: 20px;width: 700px"/>
                <div class="type">既往病史</div>
                <i-table class="tables" :columns="columns1" :data="tableData1"></i-table>
                <div class="type-child" style="margin-top: 10px">其他病史说明</div>
                <i-input type="textarea" v-model.trim="disease.other_history" :disabled="flag"></i-input>

                <div class="type">残疾<span style="color:red;">*</span></div>
                <i-table class="tables" :columns="columns2" :data="tableData2"></i-table>
                <div class="type-child" style="margin-top: 10px">其他病史说明</div>
                <i-input type="textarea" v-model.trim="disease.other_dis" :disabled="flag"></i-input>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import {dateFormatFromString, yearLists, todayYear} from '@/libs/dateUtils';
    import {getAllDep, getFitStudentList} from '@/api/basicData';

    export default {
        name: 'addChecklist',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                card_flag: true,
                showOrHide: false,
                obj: {
                    dep_id: '',
                    year: todayYear(),
                    term: '',
                    grade_no: '',
                    class_no: '',
                    student_code: '',
                    student_name: '',
                    gender: '',
                    household_type: '',
                    is_boarding: '',
                    card_type: '',
                    card_num: '',
                    card_num1: ''
                },
                disease: {
                    past_medical: '否',
                    past_time: null,
                    friend_have: '否',
                    have_touch: '否',
                    cough_expect: false,
                    hemoptysis_blood: false,
                    thorax_unwell: false,
                    low_thermal_again: false,
                    night_sweat: false,
                    slim_down: false,
                    weak: false,
                    other_unwell: '',
                    other_history: '',
                    other_dis: ''
                },
                rules: {
                    dep_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    year: [{required: true, message: '请选择学年', trigger: 'change'}],
                    term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请选择班级', trigger: 'change'}],
                    student_code: [{required: true, message: '请输入19位学籍号', trigger: 'blur'},
                        // {len: 19, message: '长度为19位', trigger: 'blur'},
                        // {pattern: /^[A-Z]{1}[0-9]{17}[0-9X]{1}$/, message: '首位字符为大写字母', trigger: 'blur'}
                    ],
                    student_name: [{required: true, message: '请输入学生姓名', trigger: 'blur'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    household_type: [{required: true, type: 'number', message: '请选择户籍类型', trigger: 'change'}],
                    is_boarding: [{required: true, type: 'number', message: '请选择是否住宿', trigger: 'change'}],
                    card_type: [{required: true, type: 'number', message: '请选择证件类型', trigger: 'change'}],
                    card_num: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                        {len: 18, message: '身份证号长度为18位', trigger: 'blur'},
                        {pattern: /^[0-9]{17}[0-9X]{1}$/, message: '身份证号格式错误', trigger: 'blur'}
                        // {required: true, validator: this.testIDcode, trigger: 'blur'}
                    ],
                    card_num1: [
                        {required: true, message: '请输入护照号', trigger: 'blur'},
                        {len: 9, message: '护照号长度为9位', trigger: 'blur'},
                        {pattern: /^[A-Z]{1,2}[0-9]{7,8}$/, message: '护照号为大写字母开头和数字组合', trigger: 'blur'}]
                },
                tableData1: [
                    {
                        type: '有/无',
                        hepatitis: 1,
                        tb: 1,
                        touch_tb: 1,
                        lga: 1,
                        chd: 1,
                        rheumatism: 1,
                        asthma: 1
                    },
                    {
                        type: '时间',
                        hepatitistime: '',
                        tbtime: '',
                        touchtbtime: '',
                        chdtime: '',
                        lgatime: '',
                        rheumatismtime: '',
                        asthmatime: ''
                    }
                ],
                tableData2: [
                    {
                        type: '有/无',
                        dis_see: 1,
                        dis_listen: 1,
                        dis_speak: 1,
                        dis_extremity: 1,
                        dis_brains: 1,
                        dis_spirit: 1
                    }
                ],
                columns1: [
                    {
                        title: '病症',
                        key: 'type',
                        width: 60
                    },
                    {
                        title: '肝炎',
                        key: 'hepatitis',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'hepatitis', 'hepatitistime');
                        }
                    },
                    {
                        title: '肺结核',
                        key: 'tb',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'tb', 'tbtime');
                        }
                    },
                    {
                        title: '有无肺结核密切接触史',
                        key: 'touch_tb',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'touch_tb', 'touchtbtime');
                        }
                    },
                    {
                        title: '先天性心脏病',
                        key: 'chd',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'chd', 'chdtime');
                        }
                    },
                    {
                        title: '肾炎',
                        key: 'lga',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'lga', 'lgatime');
                        }
                    },
                    {
                        title: '风湿病',
                        key: 'rheumatism',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'rheumatism', 'rheumatismtime');
                        }
                    },
                    {
                        title: '哮喘',
                        key: 'asthma',
                        render: (h, params) => {
                            return this.firstRender(h, params, 'asthma', 'asthmatime');
                        }
                    }
                ],
                columns2: [
                    {
                        title: '项目',
                        key: 'type'
                    },
                    {
                        title: '视力',
                        key: 'dis_see',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_see', '2');
                        }
                    },
                    {
                        title: '听力',
                        key: 'dis_listen',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_listen', '2');
                        }
                    },
                    {
                        title: '言语',
                        key: 'dis_speak',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_speak', '2');
                        }
                    },
                    {
                        title: '肢体',
                        key: 'dis_extremity',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_extremity', '2');
                        }
                    },
                    {
                        title: '智力',
                        key: 'dis_brains',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_brains', '2');
                        }
                    },
                    {
                        title: '精神',
                        key: 'dis_spirit',
                        render: (h, params) => {
                            return this.renderSelect(h, params, 'dis_spirit', '2');
                        }
                    },
                ],
                schoolList: [],
                gradeList: [],
                classList: [],
                yearList: [],
                is_manage: true
            };
        },
        methods: {
            radioChange() {
                if (this.disease.past_medical === '是') {
                    this.showOrHide = true;
                } else {
                    this.showOrHide = false;
                }
            },
            firstRender(h, params, field, field1) {
                if (params.index === 0) {
                    return this.renderSelect(h, params, field, 1);
                } else if (params.index === 1) {
                    if (this.tableData1[0][field] === 2) {
                        return this.renderDate(h, params, field1);
                    } else {
                        this.tableData1[params.index][field1] = null;
                        return h('span', null, params.row[field1]);
                    }
                }
            },
            renderSelect(h, params, filed, sindex) {
                if (this.flag) {
                    return h('span', null, params.row[filed] === 2 ? '有' : '无');
                }

                return h('i-select', {
                    props: {
                        value: params.row[filed] ? params.row[filed] : 1
                    },
                    style: {
                        width: '92px'
                    },
                    on: {
                        'on-change': (value) => {
                            if (!sindex) {
                                sindex = 1;
                            }
                            this['tableData' + sindex][params.index][filed] = value;
                        }
                    }
                }, [
                    h('i-option', {
                        props: {
                            value: 1
                        }
                    }, '无'),
                    h('i-option', {
                        props: {
                            value: 2
                        }
                    }, '有')
                ]);
            },
            renderDate(h, params, filed) {
                if (this.flag) {
                    return h('span', null, params.row[filed]);
                }
                return h('DatePicker', {
                    props: {
                        type: 'date',
                        format: 'yyyy/MM/dd',
                        value: params.row[filed] ? new Date(params.row[filed]) : ''
                    },
                    on: {
                        'on-change': (value) => {
                            params.row[filed] = value;
                            //整行赋值，就不会触发重新编译
                            this.tableData1[params.index] = params.row;
                        }
                    }
                });
            },
            dealStudent(data) {
                if (data.code === 200) {
                    this.schoolList = data.data.filter((item) => item.type === 2);
                    if (!this.is_manage) {
                        if (!this.id) {
                            this.schoolChange(this.obj.dep_id);
                        }
                    }
                } else {
                    this.schoolList = [];
                }
            },
            getSelectCondition() {

                /// ===========获取下拉列表查询条件 /// =========== 学校列表
                getAllDep().then(data => {
                    this.dealStudent(data)
                }).catch(err => {
                    window.console.log(err);
                });
            },
            schoolChange(value) {
                this.obj.grade_no = '';
                if (value === -1) {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp[0]) {
                    return;
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
                this.obj.class_no = '';
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.obj.dep_id ? this.obj.dep_id : null,
                        // year: this.obj.year ? this.obj.year : null,
                        // term: this.obj.term ? this.obj.term : null,
                        grade_no: this.obj.grade_no ? this.obj.grade_no : null,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            search() {
                Promise.all([getAllDep(), getFitStudentList(this.id)]).then(value => {
                    this.dealStudent(value[0]);

                    let data = value[1];
                    if (data.code === 200) {
                        this.schoolChange(data.data.dep_id);
                        this.obj.dep_id = data.data.dep_id;
                        this.obj.year = data.data.year;
                        this.obj.term = data.data.term;
                        this.obj.grade_no = data.data.grade_no;

                        this.gradeChange(data.data.grade_no);

                        this.obj.class_no = data.data.class_no;
                        this.obj.student_code = data.data.student_code;
                        this.obj.student_name = data.data.student_name;
                        this.obj.gender = data.data.gender;
                        this.obj.household_type = data.data.household_type;
                        this.obj.is_boarding = data.data.is_boarding;
                        this.obj.card_type = data.data.card_type;
                        // this.obj.card_num = data.data.card_num;
                        if (data.data.card_type === 1) {
                            this.obj.card_num = data.data.card_num;
                            this.card_flag = true;
                        } else if (data.data.card_type === 2) {
                            this.obj.card_num1 = data.data.card_num;
                            this.card_flag = false;
                        } else {
                            this.obj.card_num = data.data.card_num;
                            this.card_flag = true;
                        }

                        this.disease = {
                            past_medical: data.data.past_medical === 2 ? '是' : '否',
                            past_time: data.data.past_medical === 2 ? new Date(data.data.past_time) : null,
                            friend_have: data.data.friend_have === 2 ? '是' : '否',
                            have_touch: data.data.have_touch === 2 ? '是' : '否',
                            cough_expect: data.data.cough_expect === 2,
                            hemoptysis_blood: data.data.hemoptysis_blood === 2,
                            thorax_unwell: data.data.thorax_unwell === 2,
                            low_thermal_again: data.data.low_thermal_again === 2,
                            night_sweat: data.data.night_sweat === 2,
                            slim_down: data.data.slim_down === 2,
                            weak: data.data.weak === 2,
                            other_unwell: data.data.other_unwell,
                            other_history: data.data.other_history,
                            other_dis: data.data.other_dis,
                        };
                        this.tableData1 = [
                            {
                                type: '有/无',
                                hepatitis: data.data.hepatitis,
                                tb: data.data.tb,
                                touch_tb: data.data.touch_tb,
                                chd: data.data.chd,
                                lga: data.data.lga,
                                rheumatism: data.data.rheumatism,
                                asthma: data.data.asthma,
                            },
                            {
                                type: '时间',
                                hepatitistime: dateFormatFromString(new Date(data.data.hepatitistime)),
                                tbtime: dateFormatFromString(new Date(data.data.tbtime)),
                                touchtbtime: dateFormatFromString(new Date(data.data.touchtbtime)),
                                chdtime: dateFormatFromString(new Date(data.data.chdtime)),
                                lgatime: dateFormatFromString(new Date(data.data.lgatime)),
                                rheumatismtime: dateFormatFromString(new Date(data.data.rheumatismtime)),
                                asthmatime: dateFormatFromString(new Date(data.data.asthmatime))
                            }
                        ];
                        this.tableData2 = [
                            {
                                type: '有/无',
                                dis_see: data.data.dis_see,
                                dis_listen: data.data.dis_listen,
                                dis_speak: data.data.dis_speak,
                                dis_extremity: data.data.dis_extremity,
                                dis_brains: data.data.dis_brains,
                                dis_spirit: data.data.dis_spirit
                            }
                        ];
                    }
                });
            },
            confirms() {
                // console.log(this.obj);
                if (this.id) {
                    let temp1 = this.classList.some(item => item.id === this.obj.class_no);
                    if (!temp1) {
                        this.obj.class_no = '';
                    }
                    let temp2 = this.gradeList.some(item => item.id === this.obj.grade_no);
                    if (!temp2) {
                        this.obj.grade_no = '';
                    }
                }
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data = {
                        dep_id: this.obj.dep_id,
                        year: this.obj.year,
                        term: this.obj.term,
                        grade_no: this.obj.grade_no,
                        class_no: this.obj.class_no,
                        student_code: this.obj.student_code,
                        student_name: this.obj.student_name,
                        gender: this.obj.gender,
                        household_type: this.obj.household_type,
                        is_boarding: this.obj.is_boarding,
                        card_type: this.obj.card_type,
                        card_num: this.obj.card_num
                    };
                    if (this.obj.card_type === 1) {
                        data.card_num = this.obj.card_num;
                    } else if (this.obj.card_type === 2) {
                        data.card_num = this.obj.card_num1;
                    }
                    if (this.disease.past_medical === '是') {
                        if (!this.disease.past_time) {
                            this.$Message.error('请填写结核病年限');
                            return false;
                        }
                    }
                    data.past_medical = this.disease.past_medical === '否' ? 1 : 2;
                    if (data.past_medical === 2) {
                        data.past_time = dateFormatFromString(this.disease.past_time);
                        data.pasttime = this.disease.past_time.getTime();
                    }
                    data.friend_have = this.disease.friend_have === '否' ? 1 : 2;
                    data.have_touch = this.disease.have_touch === '否' ? 1 : 2;

                    data.cough_expect = this.disease.cough_expect ? 2 : 1;
                    data.hemoptysis_blood = this.disease.hemoptysis_blood ? 2 : 1;
                    data.thorax_unwell = this.disease.thorax_unwell ? 2 : 1;
                    data.low_thermal_again = this.disease.low_thermal_again ? 2 : 1;
                    data.night_sweat = this.disease.night_sweat ? 2 : 1;
                    data.slim_down = this.disease.slim_down ? 2 : 1;
                    data.weak = this.disease.weak ? 2 : 1;

                    data.other_unwell = this.disease.other_unwell ? this.disease.other_unwell : null;
                    data.other_history = this.disease.other_history ? this.disease.other_history : null;
                    data.other_dis = this.disease.other_dis ? this.disease.other_dis : null;

                    // 既往病史
                    data.hepatitis = this.tableData1[0].hepatitis;
                    data.tb = this.tableData1[0].tb;
                    data.touch_tb = this.tableData1[0].touch_tb;
                    data.chd = this.tableData1[0].chd;
                    data.lga = this.tableData1[0].lga;
                    data.rheumatism = this.tableData1[0].rheumatism;
                    data.asthma = this.tableData1[0].asthma;

                    data.hepatitis = this.tableData1[0].hepatitis;
                    data.tb = this.tableData1[0].tb;
                    data.touch_tb = this.tableData1[0].touch_tb;
                    data.chd = this.tableData1[0].chd;
                    data.lga = this.tableData1[0].lga;
                    data.rheumatism = this.tableData1[0].rheumatism;
                    data.asthma = this.tableData1[0].asthma;
                    if (this.tableData1[0].hepatitis === 2) {
                        if (!this.tableData1[1].hepatitistime) {
                            this.$Message.error('请填写肝炎时间');
                            return false;
                        }

                        data.hepatitistime = new Date(this.tableData1[1].hepatitistime).getTime();
                        data.hepatitis_time = this.tableData1[1].hepatitistime;
                    }
                    if (this.tableData1[0].tb === 2) {
                        if (!this.tableData1[1].tbtime) {
                            this.$Message.error('请填写肺结核时间');
                            return false;
                        }
                        data.tbtime = new Date(this.tableData1[1].tbtime).getTime();
                        data.tb_time = this.tableData1[1].tbtime;
                    }
                    if (this.tableData1[0].touch_tb === 2) {
                        if (!this.tableData1[1].touchtbtime) {
                            this.$Message.error('有无肺结核密切接触史时间');
                            return false;
                        }
                        data.touchtbtime = new Date(this.tableData1[1].touchtbtime).getTime();
                        data.touchtb_time = this.tableData1[1].touchtbtime;
                    }
                    if (this.tableData1[0].chd === 2) {
                        if (!this.tableData1[1].chdtime) {
                            this.$Message.error('请填写先天性心脏病时间');
                            return false;
                        }
                        data.chdtime = new Date(this.tableData1[1].chdtime).getTime();
                        data.chd_time = this.tableData1[1].chdtime;
                    }
                    if (this.tableData1[0].lga === 2) {
                        if (!this.tableData1[1].lgatime) {
                            this.$Message.error('请填写肾炎时间');
                            return false;
                        }
                        data.lgatime = new Date(this.tableData1[1].lgatime).getTime();
                        data.lga_time = this.tableData1[1].lgatime;
                    }
                    if (this.tableData1[0].rheumatism === 2) {
                        if (!this.tableData1[1].rheumatismtime) {
                            this.$Message.error('请填写风湿病时间');
                            return false;
                        }
                        data.rheumatismtime = new Date(this.tableData1[1].rheumatismtime).getTime();
                        data.rheumatism_time = this.tableData1[1].rheumatismtime;
                    }
                    if (this.tableData1[0].asthma === 2) {
                        if (!this.tableData1[1].asthmatime) {
                            this.$Message.error('请填写哮喘时间');
                            return false;
                        }
                        data.asthmatime = new Date(this.tableData1[1].asthmatime).getTime();
                        data.asthma_time = this.tableData1[1].asthmatime;
                    }

                    //残疾
                    data.dis_see = this.tableData2[0].dis_see;
                    data.dis_listen = this.tableData2[0].dis_listen;
                    data.dis_speak = this.tableData2[0].dis_speak;
                    data.dis_extremity = this.tableData2[0].dis_extremity;
                    data.dis_brains = this.tableData2[0].dis_brains;
                    data.dis_spirit = this.tableData2[0].dis_spirit;

                    if (this.id) { // 编辑
                        data.id = this.id;
                        this.$ajax({
                            url: urls.proofreading_update,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.msg);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        this.$ajax({
                            url: urls.proofreading_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.msg);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.yearList = yearLists().reverse();

            if (this.flag) {
                this.rules = {};
            }

            if (this.id) {
                if (sessionStorage.getItem('roleCode') !== '999') {
                    this.is_manage = false;
                }
                this.search();
            } else {
                this.getSelectCondition();
                if (sessionStorage.getItem('roleCode') !== '999') {
                    this.is_manage = false;
                    this.obj.dep_id = sessionStorage.getItem('dep_id');
                }
            }
        }
    };
</script>

<style lang="less">
    .addCheckLists {
        tr {
            height: 45px;
        }

        .ivu-table-cell {
            padding: 2px 4px !important;
        }

        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .tables {
            overflow: inherit;

            .ivu-date-picker-rel .ivu-input {
                padding-left: 0;
                padding-right: 22px;
            }
        }

        .type {
            font-size: 16px;
            font-weight: bold;
            margin: 19px 0;
        }

        .type-child {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-top: 29px;
        }

        .ivu-radio-group, .ivu-checkbox-group {
            margin-left: 20px;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            background: rgba(255, 255, 255, 0);
            border: 1px solid rgba(173, 173, 173, 1);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 114, 0, 1);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }

</style>
