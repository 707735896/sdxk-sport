<template>

    <div class="physicalExam content-box clearfix">
        <div class="title">
            体质抽查
        </div>
        <div class="download-group">
            <span @click="checkAlreadyTest(1)">
                <img src="../../../../assets/monitor/data.png"/><span>已抽数据</span>
            </span>
            <span style="margin-left:20px" @click="checkAlreadyTest(2)">
            <img src="../../../../assets/monitor/print.png"/><span>批量打印</span>
            </span>
        </div>
        <Divider dashed/>
        <div class="middle-content">
            <Form ref="centerContent" :model="req" :label-width="122" style="width: 860px;z-index: 111" inline
                  label-position="left">
                <FormItem label="区域">
                    <i-select v-model="req.area_id" style="width:125px" @on-change="areaChange">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:128px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称">
                    <i-select style="width:256px;" v-model="req.school_id" filterable>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'
                                  @click.native="getSchoolName(item.name)">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="男生-年龄-人数">
                    <span ref="tipsLog1" class="countTips"></span>
                    <i-select v-model="req.minAge1" style="width:80px" @on-change="clearMaxAge(1)">
                        <i-option :value="item.value" v-for="(item,i) in ageList" :key="i">{{item.label}}</i-option>
                    </i-select>
                    -
                    <i-select v-model="req.maxAge1" style="width:80px">
                        <i-option :value="item.value" v-for="(item,i) in ageList" :key="i"
                                  :disabled="item.value < req.minAge1">{{item.label}}
                        </i-option>
                    </i-select>
                    <!-- <i-select v-model="req.sex1" style="width:50px">
                        <i-option :value="1">男</i-option>
                        <i-option :value="2">女</i-option>
                    </i-select> -->
                    <i-input v-model="req.count1" style="width:80px" :maxlength="20"
                             @on-change="countChange(1)"></i-input>

                </FormItem>
                <FormItem label="女生-年龄-人数">
                    <span ref="tipsLog2" class="countTips"></span>
                    <i-select v-model="req.minAge2" style="width:80px" @on-change="clearMaxAge(2)">
                        <i-option :value="item.value" v-for="(item,i) in ageList" :key="i">{{item.label}}</i-option>
                    </i-select>
                    -
                    <i-select v-model="req.maxAge2" style="width:80px">
                        <i-option :value="item.value" v-for="(item,i) in ageList" :key="i"
                                  :disabled="item.value < req.minAge2">{{item.label}}
                        </i-option>
                    </i-select>
                    <!-- <i-select v-model="req.sex2" style="width:50px">
                        <i-option :value="1">男</i-option>
                        <i-option :value="2">女</i-option>
                    </i-select> -->
                    <i-input v-model="req.count2" style="width:80px" :maxlength="20"
                             @on-change="countChange(2)"></i-input>
                </FormItem>
            </Form>
            <div
                style="width: 730px;text-align: right;margin: auto">
                <Button type="primary" class="search-btn" @click="Choose">抽取</Button>
            </div>
        </div>
        <!-- 体质抽测 -->
        <Modal
            v-model="model"
            :width="800"
            title="苏州市体质抽测"
            class="physicalExamination1"
            :mask-closable="false"
            footer-hide
            class-name="vertical-center-modal"
            @on-cancel="closeaddModal"
        >
            <div class="schoolName">{{schoolName}}</div>
            <div class="allStuCate">
                <div class="dataCenter" v-if="isStart">
                    <div v-if="(Number(req.count1))" class="manNames" style="flex:1;">
                        <h3 style="text-align:center">{{lTitle}}</h3>
                        <div class="stunames">

                            <div v-if="lDatas.length === 0" class="item" style="width: 100%">暂无数据</div>
                            <div v-else class="item" style="margin-right: 4px;" v-for="item in lDatas" :key="item.id">
                                {{item.student_name}}
                            </div>

                        </div>
                    </div>
                    <div v-if="(Number(req.count2))" class="womanNames" style="flex:1;">
                        <h3 style="text-align:center">{{rTitle}}</h3>
                        <div class="stunames">

                            <div v-if="rDatas.length === 0" class="item" style="width: 100%">暂无数据</div>
                            <div class="item" v-else style="margin-right: 4px;" v-for="item in rDatas" :key="item.id">
                                {{item.student_name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="operator" v-else>
                    <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                    <i-button class="confirm" type="primary" style="margin-left:26px;" @click="startChoose">开始
                    </i-button>
                </div>
            </div>
            <div class="footer" v-show="isStart">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='stopExamination'>{{confirmTitle}}</i-button>
            </div>
        </Modal>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :isPrint="isPrint"
                   @modal-close='ModalClose'></component>
    </div>

</template>
<script>
    import urls from '@/service/Urls';
    import checkDatas from './alreadyExamination';
    import {yearLists, todayYear} from "@/libs/dateUtils";

    export default {
        data() {
            return {
                model: false,
                isStart: false,
                modalTitle: '',
                id: '',
                flag: false, // true 详情
                com: null,
                count: 1,
                timer: '',//定时器
                schoolName: '',
                req: {
                    school_id: '',
                    maxAge1: 17,
                    minAge1: 7,
                    maxAge2: 17,
                    minAge2: 7,
                    // sex1: 1,
                    // sex2: 2,
                    count1: 40,
                    count2: 40,
                    time: null,
                    area_id: '81D5B0F79E014C83E050007F010062EE',
                    area_id2: -1
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                areaList: [],
                areaList1: [],
                allStudentsDatas: [],
                leftDatas: [],
                rightDatas: [],
                lDatas: [],
                rDatas: [],
                lTitle: '',
                rTitle: '',
                isPrint: 0,
                ageList: [
                    {value: 7, label: 7},
                    {value: 8, label: 8},
                    {value: 9, label: 9},
                    {value: 10, label: 10},
                    {value: 11, label: 11},
                    {value: 12, label: 12},
                    {value: 13, label: 13},
                    {value: 14, label: 14},
                    {value: 15, label: 15},
                    {value: 16, label: 16},
                    {value: 17, label: 17},
                ],
                localYear: '',
                confirmTitle: '停止'

            };
        },
        methods: {
            getSchoolName(v) {
                this.schoolName = v
            },
            // '已抽数据'按钮
            checkAlreadyTest(type) {
                this.com = checkDatas;
                this.id = '';
                this.flag = false;
                if (type === 1) {
                    this.modalTitle = '已抽数据';
                    this.isPrint = 0;
                } else {
                    this.modalTitle = '批量打印';
                    this.isPrint = 1
                }
            },
            // 随机抽查学生名单
            getArrayItems(arr, num) {
                var temp_array = new Array();
                for (var index in arr) {
                    temp_array.push(arr[index]);
                }
                //取出的数值项,保存在此数组
                var return_array = new Array();
                for (var i = 0; i < num; i++) {
                    if (temp_array.length > 0) {
                        var arrIndex = Math.floor(Math.random() * temp_array.length);
                        return_array[i] = temp_array[arrIndex];
                        temp_array.splice(arrIndex, 1);
                    } else {

                        break;
                    }
                }
                return return_array;
            },
            // 获取学生名单
            getAllStudentslist(gender, maxAge, minAge) {
                let __this = this
                return new Promise((resolve, reject) => {
                    __this.$ajax({
                        url: urls.monitorStu_choose,
                        data: {
                            "year": __this.localYear,
                            "dep_id": __this.req.school_id,
                            "gender": gender,
                            "max_age": maxAge,
                            "min_age": minAge
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            resolve(data)
                        }
                    }).catch(err => {
                        window.console.log(err);
                    });
                })
            },
            // '抽取'
            Choose() {
                if (this.$refs.tipsLog1.innerHTML.length !== 0 || this.$refs.tipsLog2.innerHTML.length !== 0) {
                    this.$Message.error('还有必填项字段未填或字段不合法，请确认再抽取！');
                    return;
                }
                if (Number(this.req.count1) === 0 && (Number(this.req.count2)) === 0) {
                    this.$Message.error('请输入需要抽查人数！');
                    return;
                }
                this.$ajax({
                    url: urls.monitorStu_AllList,
                    data: {
                        area_id: this.req.area_id2 === -1 ? null : this.req.area_id2,
                        pid: this.req.area_id,
                        dep_id: this.req.school_id === -1 ? null : this.req.school_id,
                        year: this.localYear,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        let f = data.data
                        if (f.length == 0) {
                            this.lTitle = '男生';
                            this.rTitle = '女生';
                            let that = this
                            let p1 = this.getAllStudentslist(1, that.req.maxAge1, that.req.minAge1)
                            let p2 = this.getAllStudentslist(2, that.req.maxAge2, that.req.minAge2)
                            Promise.all([p1, p2]).then((result) => {
                                that.leftDatas = result[0].data
                                that.rightDatas = result[1].data
                            }).catch((error) => {
                                console.log(error)
                            })
                        } else if (f[0].status === 2) {
                            let $this = this
                            this.$confirm({
                                text: '该学校已排程，不可重复抽取',
                                onOk: function () {
                                    $this.model = false;

                                },
                                cancel: function () {
                                    // self.search();
                                    $this.model = false;

                                }
                            });
                        } else if (f[0].status === 1) {
                            let that = this
                            that.lTitle = '男生';
                            that.rTitle = '女生';
                            let p1 = that.getAllStudentslist(1, that.req.maxAge1, that.req.minAge1)
                            let p2 = that.getAllStudentslist(2, that.req.maxAge2, that.req.minAge2)
                            Promise.all([p1, p2]).then((result) => {
                                that.leftDatas = result[0].data
                                that.rightDatas = result[1].data
                            }).catch((error) => {
                                console.log(error)
                            })
                            this.$confirm({
                                text: '该学校已抽取，是否删除记录重新抽取？',
                                onOk: function () {
                                    that.$ajax({
                                        url: urls.monitorStu_delete,
                                        data: {
                                            dep_ids: [that.req.school_id],
                                            year: that.localYear
                                        }
                                    }).then(data => {
                                        if (data.code === 200) {
                                            that.$Message.success('删除成功');
                                        } else {
                                            that.$Message.error('删除失败');
                                        }
                                    })
                                },
                                cancel: function () {
                                    // self.search();
                                    that.model = false;

                                }
                            });
                        }
                    } else {
                    }
                }).catch(err => {
                    window.console.log(err);
                });

                this.model = true;
                this.isStart = false;
                this.lDatas = []
                this.rDatas = []


            },
            // '开始'抽取
            startChoose() {
                this.confirmTitle = '停止'
                this.isStart = true;
                let _this = this
                this.model = true;
                this.timer = setInterval(() => {
                    console.log('--')
                    _this.lDatas = _this.getArrayItems(_this.leftDatas, Number(_this.req.count1))
                    _this.rDatas = _this.getArrayItems(_this.rightDatas, Number(_this.req.count2))

                }, 1000);


            },
            // '停止'抽取
            stopExamination() {
                clearInterval(this.timer);
                this.confirmTitle = this.confirmTitle === '停止' ? '保存' : '停止';
                if (this.confirmTitle === '停止') {
                    let data = [...this.lDatas, ...this.rDatas]
                    data = data.map(item => {
                        return {
                            card_num: item.card_num,
                            student_id: item.id
                        }
                    })
                    // 保存体质监测名单
                    this.$ajax({
                        url: urls.monitorStu_confirm,
                        data: data
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success(data.result);
                        } else {
                            this.$Message.error('数据保存失败');
                        }
                    }).catch(err => {
                        window.console.log(err);
                    });
                    this.model = false;

                }


            },
            // 下拉框数据
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => item.type === 2);

                            this.req.school_id = this.schoolList[0].id
                            this.schoolName = this.schoolList[0].name
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });

                this.$ajax({ // 区域1
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 2);
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
                // 区域2
                this.areaChange(this.req.area_id)
            },
            // 区域变化
            areaChange(value) {
                this.tableBtnFlag = false;
                this.req.area_id2 = -1;
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
            // 输入框变化
            countChange(type) {
                if (type === 1) {
                    // if(this.req.count1 === '' || this.req.count1 == 0) {
                    //     // this.$refs.tipsLog1.innerHTML = '请输入抽查人数'
                    // }else
                    if (isNaN(Number(this.req.count1))) {
                        this.$refs.tipsLog1.innerHTML = '请输入数字'
                    } else if (this.req.count1 > 500) {
                        this.$refs.tipsLog1.innerHTML = '抽查值最大为500'
                        this.req.count1 = '';
                    } else {
                        this.$refs.tipsLog1.innerHTML = ''
                    }
                } else if (type === 2) {
                    // if(this.req.count2 === '' || this.req.count2 == 0) {
                    //     this.$refs.tipsLog2.innerHTML = '请输入抽查人数'
                    // }else
                    if (isNaN(Number(this.req.count2))) {
                        this.$refs.tipsLog2.innerHTML = '请输入数字'
                    } else if (this.req.count2 > 500) {
                        this.$refs.tipsLog2.innerHTML = '抽查值最大为500'
                        this.req.count2 = '';
                    } else {
                        this.$refs.tipsLog2.innerHTML = ''
                    }
                }

            },
            // 年龄下拉框
            clearMaxAge(type) {
                if (type === 1) {
                    this.req.maxAge1 = 17
                } else {
                    this.req.maxAge2 = 17
                }
            },
            closeaddModal() {
                clearInterval(this.timer);
                this.model = false;
            },
            ModalClose(flag) {
                clearInterval(this.timer);
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            this.localYear = todayYear()
            this.getSchoolList();
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    };
</script>
<style lang="scss">
    .physicalExam {
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
