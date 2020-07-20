<template>

    <div class="physicalExam content-box clearfix">
        <div class="title">
            体检二维码生成
        </div>
        <!-- <div class="download-group">

        </div> -->
        <Divider dashed/>
        <div class="middle-content">
            <Form ref="centerContent" :model="req" :label-width="122" style="width: 860px;z-index: 111" inline
                  label-position="left">
                <FormItem label="学校名称">
                    <i-select style="width:242px;" filterable v-model="req.dep_id" @on-change="schoolChange"
                    >
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级-班级">
                    <i-select v-model="req.grade_no" style="width:120px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}
                        </i-option>
                    </i-select>
                    <i-select v-model="req.class_no" style="width:120px">
                        <i-option v-for="item of classList" :key="item.class_id" :value='item.class_id'>
                            {{item.class_no}}
                        </i-option>
                    </i-select>
                </FormItem>

            </Form>
            <div style="width: 730px;text-align: right;margin: auto">
                <Button type="primary" class="search-btn" @click="getCodeDatas">生成并打印</Button>
            </div>
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :qrcodes="printCodeDatas"
                   @modal-close='ModalClose'></component>
    </div>

</template>
<script>
    import urls from '@/service/Urls';
    import printQRcode from './printQRcode';
    import {yearLists, todayYear} from "@/libs/dateUtils";
    import QRCode from 'qrcodejs2'

    export default {
        data() {
            return {
                modalTitle: '',
                schoolName: '',
                id: '',
                flag: false,
                com: null,
                req: {
                    grade_no: '',
                    class_no: '',
                    dep_id: ''
                },
                orignStuList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                printCodeDatas: [],
                localYear: '',
                is_manage: true
            };
        },
        methods: {
            // 生成体检二维码
            getCodeDatas() {
                console.log('QRcode')
                if (this.req.class_no == '') {
                    this.$Message.error('请选择需要打印的班级');
                    return false;
                }
                let self = this;
                this.$ajax({
                    url: urls.studentqrcode_list,
                    data: {
                        year: this.localYear,
                        grade_no: this.req.grade_no ? this.req.grade_no : null,
                        class_id: this.req.class_no ? this.req.class_no : null,
                        dep_id: this.req.dep_id ? this.req.dep_id : null
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        if (res.data.length !== 0) {
                            if (this.orignStuList.length === 0) {
                                this.orignStuList = res.data;
                                this.getCondition();
                                // this.gradeYear();
                            }
                            this.com = printQRcode;
                            this.id = null;
                            this.modalTitle = '打印';
                            this.printCodeDatas = res.data;
                            this.flag = true;
                            this.creatQRcode(res.data)
                            this.schoolName = res.data[0].dep_name;
                        } else {
                            this.$alert({
                                text: '当前无体检学生',
                                onOk: () => {
                                    self.req.grade_no = '';
                                    self.req.class_no = '';
                                }

                            });
                        }
                    } else {
                        this.data = [];
                    }
                });
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

            // 下拉框数据
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem("dep_id")
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === 2);
                        // this.req.dep_id = this.schoolList[0].id;
                        if (!this.is_manage) {
                            this.schoolChange(this.req.dep_id)
                        }
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },

            schoolChange(value) {
                // this.req.class_no = '';
                // this.req.grade_no = '';
                // this.classList = [];
                if (value === -1) {
                    this.gradeList = [];
                    return false;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    return false;
                }
                /// =========== 所属年级
                this.$ajax({
                    url: urls.new_grade_list,
                    data: {
                        dep_id: this.req.dep_id
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
                // this.req.class_no = '';
                this.$ajax({
                    url: urls.new_class_list,
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
            // 下拉列表框组获取
            getCondition() {
                let gradeList = this.orignStuList.map(item => {
                    let obj = {}
                    obj.id = item.grade_no
                    obj.name = item.grade_name
                    return obj
                });
                let classList = this.orignStuList.map(item => {
                    let obj = {}
                    obj.class_id = item.class_no;
                    obj.class_no = item.class_name;
                    return obj
                })
                gradeList = this.reduceArr(gradeList);
                classList = this.reduceArr(classList);
                this.gradeList = gradeList;
                this.classList = classList
            },
            // 学年
            gradeYear() {
                // this.yearList = yearLists().reverse();
            },
            // 数组去重
            reduceArr(arg) {
                let hash = {};
                arg = arg.reduce((preVal, curVal) => {
                    hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
                    return preVal
                }, [])
                return arg;
            },
            ModalClose(flag) {
                this.com = null;
                flag = this.flag;
                if (flag) {
                    this.getSchoolList();
                    flag = false;
                }
            }
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10203001' && code !== '10200001' && code !== '10204001') { // 管理员
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id'); //10201004
            }
            this.localYear = todayYear();
            this.getSchoolList();
        }
    };
</script>
<style lang="scss">
    .physicalExam {
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
            margin: 112px 0 97px 0;

            .ivu-form {
                margin: auto;

                .ivu-form-item-label {
                    position: relative !important;
                    top: -2px !important;
                    font-size: 16px !important;
                    font-family: SourceHanSansCN-Medium !important;
                    font-weight: 500 !important;
                    color: rgba(153, 153, 153, 1) !important;
                }

                .ivu-form-item-content {
                    width: 258px !important;
                    position: relative;

                    .countTips {
                        position: absolute;
                        top: 30px;
                        left: 0;
                        color: #ff0000;
                        // display: none;
                    }
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
                margin-top: 60px;
            }

        }
    }

    .physicalExamination1 {
        .schoolName {
            text-align: center;
            margin-top: 6px;
        }

        .allStuCate {
            min-height: 480px;
            width: 100%;
            position: relative;
            margin-top: 30px;
            padding: 0 76px;
            box-sizing: border-box;

            .operator {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%)
            }

            .dataCenter {
                display: flex;

                .stunames {
                    margin-top: 10px;

                    .item {
                        min-width: 70px;
                        padding: 0 8px;
                        height: 36px;
                        background-color: #DDE5E7;
                        text-align: center;
                        line-height: 34px;
                        display: inline-block;
                        margin-bottom: 8px;

                    }
                }

            }
        }
    }

</style>
