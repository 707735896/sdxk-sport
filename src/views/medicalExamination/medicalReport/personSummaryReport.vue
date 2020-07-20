<template>
    <div class="personSummaryReport">
        <div class="content-box">
            <h3 class="title">电子体检报告</h3>
            <Form class="clearfix search-form" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="req.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="req.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <i-select v-model="req.dep_id" filterable style="width:150px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="40">
                    <i-select v-model="req.grade_no" style="width:120px" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="40">
                    <i-select style="width:120px" v-model="req.class_no">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="姓名" :label-width="40">
                    <i-input style="width:120px" v-model="req.student_name" :maxlength="15"></i-input>
                </FormItem>
                <FormItem label="体检项" :label-width="60">
                    <i-select v-model="req.prop_id" style="width:140px">
                        <Option value="-1">默认项</Option>
                        <i-option v-for="item of propSelection" :key="item.code" :value='item.id'
                                  @click.native="getCode(item)">{{item.value}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="状态" :label-width="50">
                    <i-select v-model="req.status" style="width:80px">
                        <i-option value="-1">全部</i-option>
                        <i-option :value='1'>正常</i-option>
                        <i-option :value='2'>异常</i-option>
                        <i-option :value='3'>已核实</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div style="margin-top:4px">
                <div class="add" @click="prints" :isClick="true">
                    <img alt="print" src="../../../assets/common/print.png"/>
                    打印
                </div>
            </div>
            <BaseTable border center :columns="columns" ref="reportTable" :data="tableData" :loading="loading"
                   @on-selection-change="selectionChange" class="reportList"></BaseTable>

            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current='pageConfig.page'
                  :page-size-opts='pageConfig.opts'
                  :page-size='pageConfig.size'
                  @on-change='pageChange'
                  @on-page-size-change='sizeChange'/>

            <!-- 异常弹窗 -->
            <Modal
                class="errorModal"
                title="异常"
                :mask-closable="false"
                v-model="errorModal"
                :footer-hide="true"
                width='500'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
                <Form :model="errorInfo" label-position="left" :rules="rule" ref="errorInfo">
                    <Row>
                        <FormItem label="异常选项" prop="set_ids">
                            <i-select v-model="errorInfo.set_ids" style="width:460px" multiple filterable>
                                <i-option v-for="item of errorSelection" :key="item.id" :value='item.id'>{{item.value}}
                                </i-option>
                            </i-select>
                        </FormItem>
                        <FormItem label="异常备注" prop="reason">
                            <Input v-model="errorInfo.reason" class="roleName" type="textarea"/>
                        </FormItem>
                    </Row>
                </Form>
                <div class="footer">
                    <i-button class="close" type="default" @click="closeaddModal">取消</i-button>
                    <i-button class="confirm" type="primary" @click="commitError">保存</i-button>

                </div>
            </Modal>
        </div>
        <component :title="modalTitle" :is='com' :planCode='planCode' :year='year' :studentCode='studentCode'
                   :flag="flag" :student_id='student_id' @modal-close='ModalClose'></component>


        <div style="display:none;">
            <div id="page1" class="breakable" style="height: 100%; position: relative;">
                <div class="myTjPrintTable ">
                    <div align="">
                        <h2 style="text-align:center">苏州市中小学生健康体检表（2019版）</h2>
                        <div class="baseInfo">
                            <div class="item">
                                <div style="width: 48%">
                                    学校：{{topInfo.school}}
                                    <span class="line school"></span>
                                </div>
                                <div style="width:20%">
                                    年级：{{topInfo.grade}}
                                    <span class="line grade"></span>
                                </div>
                                <div class="classStyle" style="width:14%">
                                    班级：{{topInfo.class}}
                                    <span class="line class"></span>
                                </div>
                                <div style="width:18%">
                                    姓名：{{topInfo.name}}
                                    <span class="line name"></span>
                                </div>
                            </div>
                            <div class="item">
                                <div style="width: 20%">
                                    性别：{{topInfo.sex}}
                                    <span class="line sex"></span>
                                </div>
                                <div style="width: 20%">
                                    民族：{{topInfo.nation}}
                                    <span class="line sex"></span>
                                </div>
                                <div style="width: 20%">
                                    寄宿与否：{{topInfo.is_boarding}}
                                    <span class="line zhuzu"></span>
                                </div>
                                <div style="width: 40%">
                                    身份证号：{{topInfo.IDcard}}
                                    <span class="line ID"></span>
                                </div>
                            </div>
                            <div class="item redDoted">
                                <div style="width: 100%">
                                    既往病史 ：{{topInfo.history}}
                                    <span class="line history"></span>
                                </div>
                            </div>
                            <div class="item redDoted">
                                <div style="width: 100%">
                                    残疾情况 ：{{topInfo.disability}}
                                    <span class="line history"></span>
                                </div>
                            </div>
                        </div>
                        <table class="tj_reportTable" border="1" style="border-collapse: collapse;">
                            <tr>
                                <td colspan="2">
                                    <div align="left">一般</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">身高</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.height}}cm</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">体重</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.weight}}kg</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">生理功能</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">收缩压</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.ssy}}<span class="unit-float">(mmHg)</span></div>
                                </td>
                                <td colspan="2">
                                    <div align="left">舒张压</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.szy}}<span class="unit-float">(mmHg)</span></div>
                                </td>
                                <td colspan="2">
                                    <div align="left">心率</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.pulse}}<span class="unit-float">(次/分)</span></div>
                                </td>

                            </tr>
                            <tr>
                                <td rowspan="6" colspan="2">
                                    <div align="left">眼科</div>
                                </td>

                                <td colspan="2">
                                    <div align="left">结膜</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.newophthalmologys.jiem === 0? '异常':'正常'}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">角膜</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.newophthalmologys.jiaom ===0? '异常':'正常'}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">晶体</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.newophthalmologys.jt === 0? '异常':'正常'}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">瞳孔</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">
                                        {{tjReportData.newophthalmologys.tk === 0? '异常':'正常'}}
                                    </div>
                                </td>
                                <td colspan="2">
                                    <div align="left">眼位</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.newophthalmologys.yw === 0?
                                        '异常':'正常'}}
                                    </div>
                                </td>
                                <td colspan="2">
                                    <div align="left">眼球运动</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">
                                        {{tjReportData.newophthalmologys.yqyd === 0? '异常':'正常'}}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">异常视觉行为</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">
                                        {{tjReportData.newophthalmologys.ycsjxw}}{{tjReportData.newophthalmologys.qtycsjxw?`,其他(${tjReportData.newophthalmologys.qtycsjxw})`:''}}
                                    </div>
                                </td>
                                <td colspan="2">
                                    <div align="left">临床印象</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">
                                        {{tjReportData.newophthalmologys.lcyx}}{{tjReportData.newophthalmologys.qtlcyx?`,其他(${tjReportData.newophthalmologys.qtlcyx})`:''}}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">戴镜情况</div>
                                </td>
                                <td colspan="10">
                                    <div align="left">{{tjReportData.newophthalmologys.dj}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">右眼裸眼视力 (按5.0计数法)</div>
                                </td>
                                <td colspan="1">
                                    <div align="left">{{tjReportData.r_eyesight}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">左眼裸眼视力 (按5.0计数法)</div>
                                </td>
                                <td colspan="1">
                                    <div align="left">{{tjReportData.l_eyesight}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">右眼戴镜视力 (按5.0计数法)</div>
                                </td>
                                <td colspan="1">
                                    <div align="left">{{tjReportData.r_bcva}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">左眼戴镜视力 (按5.0计数法)</div>
                                </td>
                                <td colspan="1">
                                    <div align="left">{{tjReportData.l_bcva}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">屈光临床印象</div>
                                </td>
                                <td colspan="10">
                                    <div align="left">{{tjReportData.newophthalmologys.diolcyx}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2" colspan="2">
                                    <div align="left">口腔</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">齿列</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.stomatologys.dentition === 1 ? '整齐':'不齐'}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">牙周</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.stomatologys.periodontal === 1?'正常':'异常'}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">有无龋齿</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.stomatologys.decayed_tooth === 1? '无':'有'}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">龋患</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">乳牙{{tjReportData.stomatologys.ru_broken}}&nbsp;恒牙{{tjReportData.stomatologys.he_broken}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">龋失</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">乳牙{{tjReportData.stomatologys.ru_lose}}&nbsp;恒牙{{tjReportData.stomatologys.he_lose}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">龋补</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">乳牙{{tjReportData.stomatologys.ru_repair}}&nbsp;恒牙{{tjReportData.stomatologys.he_repair}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="4" colspan="2">
                                    <div align="left">外科</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">皮肤</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.skin_str}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">淋巴结</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.lymph_str}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">头部</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.head_str}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">颈部</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.neck_str}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">脊柱</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.spine_str}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">四肢</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.surgerys.legs_str}}</div>
                                </td>

                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">胸部</div>
                                </td>
                                <td colspan="10">
                                    <div align="left">{{tjReportData.surgerys.throax_str}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="3" colspan="2">
                                    <div align="left">内科</div>
                                </td>
                                <td colspan="2">
                                    <div class="" align="left">近期不适症状</div>
                                </td>
                                <td colspan="10">
                                    <div align="left">
                                        {{tjReportData.internals.recent_unwell}}{{tjReportData.internals.other_record?`
                                        其他(${tjReportData.internals.other_record})`:''}}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">心</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.internals.heart_str}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">肺</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.internals.lung_str}}</div>
                                </td>
                            </tr>
                            <tr>

                                <td colspan="2">
                                    <div align="left">肝</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.internals.liver_str}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">脾</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{tjReportData.internals.spleen_str}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2" colspan="2">
                                    <div align="left">检验</div>
                                </td>
                                <td colspan="2">
                                    <div align="left" class="">肝功能ALT**</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.clinicalLabs.alt }}<span
                                        class="unit-float">(u/l)</span></div>
                                </td>
                                <td colspan="2">
                                    <div align="left" class="">肝功能TBIL**</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.clinicalLabs.tbil}}<span class="unit-float">(μmol/l)</span>
                                    </div>
                                </td>
                                <td colspan="2">
                                    <div align="left" class="">血红蛋白**</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.clinicalLabs.hemoglobin }}<span class="unit-float">(g/l)</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left" class="">结核菌素试验<span class="unit-float1">**</span></div>
                                </td>
                                <td colspan="2">
                                    <div align="left">{{tjReportData.skinTests.res}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left " class="">其他化验结果*</div>
                                </td>
                                <td colspan="8">
                                    <div align="left">{{tjReportData.clinicalLabs.other_clinical}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">检查</div>
                                </td>
                                <td colspan="2">
                                    <div align="left" class="">胸部X线检查<span class="unit-float1">**</span></div>
                                </td>
                                <td colspan="10">
                                    <div align="left">{{tjReportData.inspects.x_ray === 1 ? '未见异常':
                                        (tjReportData.inspects.x_ray === 2 ? '异常' :'')}}
                                    </div>
                                </td>

                            </tr>

                            <tr class="">
                                <td colspan="2">
                                    <div align="left">健康评价</div>
                                </td>
                                <td colspan="12">
                                    <div align="left">{{tjReportData.mainInspects.health_assessment}}</div>
                                </td>
                            </tr>
                            <tr class="tj_jielun">
                                <td colspan="2">
                                    <div align="left">本次体检结论</div>
                                </td>
                                <td colspan="12">
                                    <!-- <div v-for="(item,i) of jielun" :key="i" style="padding:0;margin:0;" align="left">{{item}}</div> -->
                                    <div style="word-break:break-all;white-space: pre-line;" align="left">
                                        {{tjReportData.mainInspects.main_result }}
                                    </div>
                                </td>
                            </tr>
                            <tr class="zhidao">
                                <td colspan="2">
                                    <div align="left">健康指导</div>
                                </td>
                                <td colspan="12">
                                    <!-- <div v-for="(item,i) of zhidao" :key="i" style="padding:0;margin:0;" align="left">{{item}}</div> -->
                                    <div style="word-break:break-all;white-space: pre-line;" align="left">
                                        {{tjReportData.mainInspects.health_guide }}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div align="left">体检单位</div>
                                </td>
                                <td colspan="6">
                                    <div align="left">{{tjReportData.hospital_name}}</div>
                                </td>
                                <td colspan="2">
                                    <div align="left">体检日期</div>
                                </td>
                                <td colspan="4">
                                    <div align="left">{{topInfo.date && topInfo.date.split(' ')[0]}}
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div class="reports_footer">
                            <div class="beizhu">
                                <p>1、肝功能ALT**，肝功能TBIL**，血红蛋白**为寄宿制学生必要时检查项目，如检查，结果须上报。</p>
                                <p>2、结核菌素试验**：高中和寄宿制初中的入学新生及其他学段有肺结核密切接触者必须检查项目，结果必须上报;结果根据症状进行判断。</p>
                                <p>3、胸部X线检查**：对肺结核可疑症状者和结核菌素试验强阳性者必须检查项目，结果必须上报。</p>
                            </div>
                            <div class="sign">家长签名：<span class="line"></span></div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import physicalReportInfo from './physicalReportInfo';
    import analysisReportInfo from './analysisReports';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    export default {
        name: 'personSummaryReport',
        data() {
            return {
                newWin: '',
                loading: true,
                isClick: true,
                req: {
                    status: '-1',
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    code: '',
                    prop_id: '-1',
                    student_name: ''
                },
                tableData: [],
                currentRow: {},
                currentid: 0,
                columnsFoot: [{
                    title: '操作',
                    align: 'center',
                    fixed: 'right',
                    width: 270,
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    marginRight: '20px'
                                },
                                on: {
                                    click: () => {
                                        this.infos(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    attrs: {
                                        src: require('../../../assets/common/info.png')
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
                                    cursor: 'pointer',
                                    marginRight: '20px'
                                },
                                on: {
                                    click: () => {
                                        this.analyze(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    attrs: {
                                        src: require('../../../assets/physicalFitnessTest/analyze.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '分析')
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
                                        this.isError(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    attrs: {
                                        src: require('../../../assets/common/reference_retest.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '校医核实')
                            ])
                        ]);
                    }
                }],
                columns: [],
                columns1: [
                    // {
                    //     title: ' ',
                    //     width: 40,
                    //     align: 'center',
                    //     fixed: 'left',
                    //     render: (h, params) => {
                    //         let id = params.row.id;
                    //         let flag = this.currentid === id;
                    //         let self = this;
                    //         return h('Radio', {
                    //             props: {
                    //                 value: flag
                    //             },
                    //             style: {
                    //                 marginLeft: '8px',
                    //                 cursor: 'pointer'
                    //             },
                    //             on: {
                    //                 'on-change': () => {
                    //                     self.currentid = id;
                    //                     this.currentRow = params.row;
                    //                 }
                    //             }
                    //         });
                    //     }
                    // },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        type: 'index',
                        width: 60,
                        fixed: 'left',
                        title: '序号',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 100,
                        key: 'year',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 160,
                        key: 'area_name',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        minWidth: 130,
                        key: 'school_name',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'grade_name',
                        align: 'center'
                    },
                    {
                        title: '班级',
                        width: 100,
                        key: 'class_name',
                        align: 'center'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        width: 60,
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        width: 60,
                        key: 'state',
                        align: 'center',
                        render: (h, params) => {
                            const state = params.row.r_state;
                            let tmpStr = '';
                            if (state === 1) {
                                tmpStr = '正常';
                            } else if (state === 2) {
                                tmpStr = '异常';
                            } else {
                                tmpStr = '已核实';
                            }
                            return h('span', {
                                style: {
                                    color: state === 2 ? '#FF7200' : '#000'
                                }
                            }, tmpStr);
                        }
                    }
                ],
                columns2: [
                    {
                        title: '一般',
                        align: 'center',
                        children: [
                            {
                                title: '身高',
                                key: 'height',
                                align: 'center',
                                width: 60,
                            },
                            {
                                title: '体重',
                                key: 'weight',
                                align: 'center',
                                width: 60
                            },
                        ]
                    },
                    {
                        title: '课桌椅型号',
                        width: 62,
                        key: 'desk_mat',
                        align: 'center'
                    },
                    {
                        title: '生理功能',
                        align: 'center',
                        children: [
                            {
                                title: '收缩压',
                                key: 'sp',
                                align: 'center',
                                width: 70,
                            },
                            {
                                title: '舒张压',
                                key: 'dp',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '脉搏',
                                key: 'pulse',
                                align: 'center',
                                width: 60
                            }
                        ]
                    },
                    {
                        title: '视力',
                        align: 'center',
                        children: [
                            {
                                title: '右眼视力',
                                key: 'r_eyesight',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '左眼视力',
                                key: 'l_eyesight',
                                align: 'center',
                                width: 80,
                            },
                            {
                                title: '右眼戴镜视力',
                                key: 'r_bcva',
                                align: 'center',
                                width: 62
                            },
                            {
                                title: '左眼戴镜视力',
                                key: 'l_bcva',
                                width: 62,
                                align: 'center',
                            }
                        ]
                    }
                ],
                trendsColumn: [
                    {
                        title: '眼科',
                        align: 'center',
                        children: [
                            {
                                title: '结膜',
                                key: 'jiem',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.render1(h, params.row.jiem);
                                }
                            },
                            {
                                title: '角膜',
                                key: 'jiaom',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.render1(h, params.row.jiaom);
                                }
                            },
                            {
                                title: '晶体',
                                key: 'jt',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.render1(h, params.row.jt);
                                }
                            },
                            {
                                title: '瞳孔',
                                key: 'tk',
                                width: 60,
                                align: 'center',
                                render: (h, params) => {
                                    return this.render1(h, params.row.tk);
                                }
                            },
                            {
                                title: '眼位',
                                key: 'yw',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.render1(h, params.row.yw);
                                }
                            },
                            {
                                title: '眼球运动',
                                key: 'yqyd',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    return this.render1(h, params.row.yqyd);
                                }
                            },
                            {
                                title: '异常视觉行为',
                                key: 'ycsjxw',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '临床印象',
                                key: 'lcyx',
                                align: 'center',
                                minWidth: 100
                            },
                            {
                                title: '戴镜情况',
                                align: 'center',
                                children: [
                                    {
                                        title: '戴镜情况',
                                        key: 'dj',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let obj = {
                                                1: '不戴镜 *',
                                                2: '佩戴框架眼镜 *',
                                                3: '佩戴隐性眼镜 *',
                                                4: '佩戴角膜塑形镜 * '
                                            };
                                            return h('span', null, obj[params.row.dj]);
                                        }
                                    },
                                    {
                                        title: '戴镜右眼度数(D)',
                                        key: 'dj_r',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            return h('span', null, params.row.dj_r ? params.row.dj_r + ' *' : '');
                                        }
                                    },
                                    {
                                        title: '戴镜左眼度数(D)',
                                        key: 'dj_l',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            return h('span', null, params.row.dj_l ? params.row.dj_l + ' *' : '');
                                        }
                                    }
                                ]
                            },
                            {
                                title: '屈光临床印象',
                                key: 'diolcyx',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '角膜曲率半径(mm) *',
                                key: 'jmqlbj',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '眼轴长度(mm) *',
                                key: 'yzcd',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '色觉 *',
                                key: 'sj',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return this.render1(h, params.row.sj);
                                }

                            },
                            {
                                title: '随访 *',
                                key: 'sf',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '转诊 *',
                                key: 'zz',
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '检查科',
                        align: 'center',
                        children: [
                            {
                                title: '胸部X线检查 **',
                                key: 'x_ray',
                                align: 'center',
                                width: 120,
                                render: (h, params) => {
                                    return h('span', null, params.row.x_ray === 1 ? '未见异常' : (params.row.x_ray === 2 ? '异常' : ''));
                                }
                            }
                        ]
                    },
                    {
                        title: '结核菌素皮肤试验检查',
                        align: 'center',
                        children: [
                            {
                                title: '结核菌素试验 **',
                                key: 'result',
                                width: 150,
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '外科',
                        align: 'center',
                        children: [
                            {
                                title: '皮肤',
                                key: 'skin_str',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '淋巴结',
                                key: 'lymph_str',
                                align: 'center',
                                width: 120,
                            },
                            {
                                title: '头部',
                                key: 'head_str',
                                align: 'center',
                                width: 120,
                                // render: (h, params) => {
                                //     return h('span', null, params.row.head === 1 ? '正常' : '异常');
                                // }
                            },
                            {
                                title: '颈部',
                                key: 'neck_str',
                                width: 120,
                                align: 'center'
                            },
                            {
                                title: '胸部',
                                key: 'throax_str',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '其他记录 *',
                                key: 'other',
                                align: 'center',
                                width: 120,
                                render: (h, params) => {
                                    return h('span', null, params.row.other ? params.row.other : '无');
                                }
                            },
                        ]
                    },
                    {
                        title: '内科',

                        align: 'center',
                        children: [
                            {
                                title: '近期不适症状',
                                key: 'recent_unwell',
                                align: 'center',
                                width: 160,
                                render: (h, params) => {
                                    return h('span', null, params.row.recent_unwell ? params.row.recent_unwell : '无');
                                }
                            },
                            {
                                title: '其他症状 *',
                                key: 'other_unwell',
                                align: 'center',
                                width: 160,
                                render: (h, params) => {
                                    return h('span', null, params.row.other_unwell ? params.row.other_unwell : '无');
                                }
                            },
                            {
                                title: '心',
                                key: 'heart_str',
                                align: 'center',
                                width: 140
                            },
                            {
                                title: '肺',
                                key: 'lung_str',
                                width: 140,
                                align: 'center'
                            },
                            {
                                title: '肝',
                                key: 'liver_str',
                                align: 'center',
                                width: 60
                            },
                            {
                                title: '脾',
                                key: 'spleen_str',
                                align: 'center',
                                width: 60
                            },
                            {
                                title: '其他记录 *',
                                key: 'other_record',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', null, params.row.other_record ? params.row.other_record : '无');
                                }
                            },
                        ]
                    },
                    {
                        title: '检验科',
                        align: 'center',
                        children: [
                            {
                                title: '肝功能ALT(U/L) **',
                                key: 'alt',
                                align: 'center',
                                width: 130
                            },
                            {
                                title: '肝功能TBIL(umol/L) **',
                                key: 'tbil',
                                align: 'center',
                                width: 160,
                            },
                            {
                                title: '血红蛋白(g/L) **',
                                key: 'hemoglobin',
                                align: 'center',
                                width: 130
                            },
                            {
                                title: '其他记录 *',
                                key: 'other_clinical',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', null, params.row.other_clinical ? params.row.other_clinical : '无');
                                }
                            },
                        ]
                    },
                    {
                        title: '口腔科',
                        align: 'center',
                        children: [
                            {
                                title: '齿列',
                                key: 'dentition ',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition == 1 ? '整齐' : '不齐');
                                }
                            },
                            {
                                title: '牙周',
                                key: 'periodontal',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', null, params.row.periodontal == 1 ? '正常' : '异常');
                                }
                            },
                            {
                                title: '有无龋齿（无/有）',
                                key: 'decayed_tooth ',
                                align: 'center',
                                width: 130,
                                render: (h, params) => {
                                    return h('span', null, params.row.decayed_tooth == 1 ? '无' : '有');
                                }
                            },
                            {
                                title: '龋患恒牙',
                                key: 'he_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋患乳牙',
                                key: 'ru_broken',
                                width: 80,
                                align: 'center',
                            },
                            {
                                title: '龋失恒牙',
                                key: 'he_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋失乳牙',
                                key: 'ru_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补恒牙',
                                key: 'he_repair',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补乳牙',
                                key: 'ru_repair',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '其他记录 *',
                                key: 'remark',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', null, params.row.remark ? params.row.remark : '无');
                                }
                            },
                        ]
                    },
                    // {
                    //     title: '胸围',
                    //     align: 'center',
                    //     key: 'xw',
                    //     width: 100
                    // }
                ],
                selectionValue: [],
                yearList: [],
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                modalTitle: '',
                errorInfo: {
                    set_ids: [],
                    reason: '',
                    year: '',
                    plan_code: '',
                    student_code: '',
                    school_sid: '',
                    student_id: '',
                    plan_id: ''
                },
                rule: {
                    set_ids: [
                        {required: true, type: 'array', message: '请选择异常类型', trigger: 'change'}
                    ],
                    reason: [
                        {required: true, message: '请填写异常备注', trigger: 'blur'}
                    ]
                },
                flag: false,
                id: '',
                modal: false,
                errorModal: false,
                com: null,
                planCode: null,
                year: null,
                studentCode: null,
                student_id: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                // 皮肤
                skinCondition: {
                    1: '正常',
                    2: '潮红',
                    3: '发白',
                    4: '发绀',
                    5: '黄染',
                    6: '色素沉着',
                    7: '湿疹',
                    8: '糜烂'
                },
                // 淋巴结
                lymphCondition: {
                    1: '未触及',
                    2: '锁骨上',
                    3: '腋窝'
                },
                // 色觉
                eye_colorCondition: {
                    1: '正常',
                    2: '色盲',
                    3: '色弱',
                    4: '既是色盲又是色弱'
                },
                //结核菌素皮肤试验
                resultCondition: {
                    1: '阴性',
                    2: '一般阳性',
                    3: '中度阳性',
                    4: '强阳性',
                    5: ''
                },
                // 胸部
                throaxCondition: {
                    1: '正常',
                    2: '桶状胸',
                    3: '扁平胸',
                    4: '鸡胸',
                    5: '漏斗胸'
                },
                // 口腔--牙周
                periodontalCondition: {
                    1: '阴性',
                    2: '牙龈炎',
                    3: '牙石',
                    4: '浅牙周袋',
                    5: '深牙周袋',
                },
                errorSelection: [
                    {id: '8e185be85aa84a69894d33bc80aee4dc', value: '生理功能'},
                    {id: '8EE7B19DFAC74C7E898E983785800A0A', value: '一般'},
                    // {id: 'a6efcc860d76449ab45de28bf128f769', value: '眼科'},
                    {id: '3438ae5f1a8249c192c0e8abf1629210', value: '视力'}
                ],
                propSelection: [],
                is_manage: true,

                topInfo: {
                    school: '',
                    grade: '',
                    class: '',
                    name: '',
                    sex: '',
                    IDcard: '',
                    date: '',
                    history: ''
                },
                phy_type: '',
                tjReportData: {
                    // 眼科
                    newophthalmologys: {},
                    // 口腔
                    stomatologys: {},
                    // 外科
                    surgerys: {
                        other: ''
                    },
                    // 内科
                    internals: {},
                    // 化验
                    clinicalLabs: {},
                    inspects: {},
                    skinTests: {},
                    dioptrics: {},
                    // 结核病筛查
                    tuberculosiss: {
                        doctor_result: '是肺结核可疑症状者',
                        confirm: '是',
                    },
                    // 结论
                    mainInspects: {}
                },
                studentsId: [],
                jielun: [],
                zhidao: [],
                // 结核菌素
                tuberCondition: {
                    1: '阴性',
                    2: '一般阳性',
                    3: '中度阳性',
                    4: '强阳性',
                    5: ''
                },
                //戴镜情况
                djCondition: {
                    1: '不戴镜',
                    2: '佩戴框架眼镜',
                    3: '佩戴隐形眼镜',
                    4: '配戴角膜塑形镜'
                }
            };
        },
        watch: {
            newWin() {
                window.open(this.newWin, "_blank")
            }
        },
        methods: {
            render1(h, value) {
                if (value === 1) {
                    return h('span', null, '正常');
                } else if (value === 2) {
                    return h('span', null, '异常');
                }
                return h('span', null, '');
            },
            infos(row) {
                this.planCode = row.plan_code;
                this.year = row.year;
                this.studentCode = row.student_code;
                this.student_id = row.id;
                this.flag = true;
                this.modalTitle = '详情页';
                this.com = physicalReportInfo;
            },
            // 异常处理
            commitError() {
                this.$refs['errorInfo'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    // 异常问题提交
                    this.$ajax({
                        url: urls.commit_anomalous_info,
                        data: this.errorInfo
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success('操作成功');
                            this.search();
                        } else {
                            this.$Message.error(data.data.info);
                        }
                    });
                    this.errorModal = false;
                });

            },
            getCode(e) {
                this.req.code = e.code;
            },
            // 获取查询下拉框
            getSelectCondition() {
                this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
                this.$ajax({
                    // 体检项目
                    url: urls.sets_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.propSelection = data.data;
                    }
                });

                let schData = {};
                if (sessionStorage.getItem('roleCode') !== '999') {
                    schData = {
                        'dep_id': sessionStorage.getItem('dep_id')
                    }
                }
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: schData
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => item.type === 2);
                        if (!this.is_manage) {
                            this.schoolChange(this.req.dep_id);
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
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    return false;
                }
                /// =========== 所属年级
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
                        // year: this.req.year ? this.req.year : null,
                        // term: this.req.term === '-1' ? null : this.req.term,
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
            // 获取区级城市
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            // 查询
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            // 列表数据
            search() {
                const {year, area_id1, area_id2, dep_id, grade_no, class_no, student_name, status} = this.req;
                let {code, prop_id} = this.req;
                if (prop_id === '-1') {
                    this.columns = [...this.columns1, ...this.columns2, ...this.columnsFoot];
                    prop_id = '8EE7B19DFAC74C7E898E983785800A0A';
                    code = 'PHYSICAL_EXAM_RECORD';
                } else if (prop_id === 'a6efcc860d76449ab45de28bf128f769') { // 眼科
                    code = 'NEWOPHTHALMOLOGY';
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(0, 1), ...this.columnsFoot];
                } else if (prop_id === 'd1477eb2c08546c98bc46d71ede96c65') { // 检查科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(1, 2), ...this.columnsFoot];
                } else if (prop_id === 'e0449ee79436491d9ae149287c023efe') { /// "结核菌素皮肤试验检查"
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(2, 3), ...this.columnsFoot];
                } else if (prop_id === '7c59edca1a434725b9b11702876858b3') { // 外科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(3, 4), ...this.columnsFoot];
                } else if (prop_id === 'f8845b0393d64726a9cc269d25ded5fd') { // 内科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(4, 5), ...this.columnsFoot];
                } else if (prop_id === 'd56fcfc34fa94d99a4e3ea5ce775a1f7') { // 检验科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(5, 6), ...this.columnsFoot];
                } else if (prop_id === 'b8b0af7f6dab499281ceb9dc31ff2dcb') { // 口腔科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(6, 7), ...this.columnsFoot];
                } else if (prop_id === '424095301EF0DCE4474A443A607AD19D') { // 胸围
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(7, 8), ...this.columnsFoot];
                }

                const {page, size} = this.pageConfig;
                this.$ajax({
                    url: urls.elec_list,
                    data: {
                        page: page,
                        size: size,
                        year: year,
                        area_pid: area_id1 === '-1' ? null : area_id1,
                        area_id: area_id2 === '-1' ? null : area_id2,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        class_no: class_no === '-1' ? null : class_no,
                        set_id: prop_id,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        code: code,
                        student_name: student_name ? student_name : null,
                        r_state: status === '-1' ? null : status
                    }
                }).then(data => {
                    this.loading = false;
                    if (data.code === 200) {
                        let res = data.data;
                        res.forEach(item => {
                            item.skin = item.skin ? this.getDetailCondition(item.skin, 1) : null;
                            item.lymph = item.lymph ? this.getDetailCondition(item.lymph, 2) : null;
                            item.throax = item.throax ? this.getDetailCondition(item.throax, 3) : null;
                            item.result = item.result ? this.getDetailCondition(item.result, 6) : null;
                            item.lcyx = item.qtlcyx ? `${item.lcyx} 其他(${item.qtlcyx})` : item.lcyx;
                            item.ycsjxw = item.qtycsjxw ? `${item.ycsjxw} 其他(${item.qtycsjxw})` : item.lcyx;
                        });
                        this.tableData = res;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.tableData = [];
                });
            },
            // 打印
            prints() {
                // if (!this.isClick) {
                //     this.$Message.error('上一批报告正在生成中……请稍等');
                //     return;
                // }
                // 打印
                // if (this.selectionValue.length === 0) {
                //     this.$Message.error('请选择要打印的报告');
                //     return;
                // }
                // var isIE = !!window.ActiveXObject || 'ActiveXObject' in window; //判断是否IE浏览器
                // if (isIE) { //判断是否IE浏览器
                //     this.student_id = this.selectionValue;
                //     this.studentsId = JSON.parse(JSON.stringify(this.student_id));
                //     this.$Message.loading({
                //         content: '报告生成中，请稍等……',
                //         duration: 300
                //     });
                //     this.getPrintData();
                //     // this.flag = true;
                //     // this.modalTitle = '打印';
                //     // this.com = printSummaryReport;
                // } else {
                //     this.$Message.warning('打印操作请在ie浏览器下进行');
                // }


                this.$ajax({
                    url: urls.print_reports,
                    data: {
                        student_ids: this.selectionValue
                    }

                }).then(data => {
                    if (data.code === 200) {
                        this.newWin = data.result.url;
                    }
                });

            },

            // 打印
            doPrint() {
                var myDoc = {
                    documents: document,
                    copyrights: '随便写 ' // 版权声明必须
                };
                console.log(window.getJCP);
                var jcp = window.getJCP();
                // 调用打印方法
                jcp.print(myDoc, false); // 不弹出对话框打印
                // jcp.printPreview(myDoc, false)//预览
            },
            //打印数据
            getPrintData() {
                this.isClick = false;
                if (this.studentsId.length === 0) {
                    this.$Message.destroy();
                    this.$Message.success({
                        content: '报告生成完毕，正在打印中……',
                        duration: 10
                    });
                    setTimeout(function () {
                        this.isClick = true;
                    }, 2000);
                } else {
                    this.$ajax({
                        url: urls.retest_single_info,
                        data: {
                            student_id: this.studentsId[0],
                            type: 1
                        }

                    }).then();
                }

            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            // 分析参数取值
            getDetailCondition(argu, type) {
                if (type === 1) {//皮肤
                    return this.skinCondition[argu] || '其他';
                } else if (type === 2) {//淋巴结
                    return this.lymphCondition[argu] || '其他';
                } else if (type === 3) {//胸部
                    return this.throaxCondition[argu] || '其他';
                } else if (type === 4) {//牙周
                    return this.periodontalCondition[argu] || '其他';
                } else if (type === 5) {//结核菌素
                    return this.tuberCondition[argu] || '其他';
                } else if (type === 6) {//结核菌素皮肤试验
                    return this.resultCondition[argu] || '其他';
                } else if (type === 8) {//戴镜情况
                    return this.djCondition[argu] || '其他';
                }

            },
            // 分析
            analyze(row) {
                this.planCode = row.plan_code;
                this.year = row.year;
                this.studentCode = row.student_code;
                this.student_id = row.id;
                this.flag = true;
                this.modalTitle = '分析页面';
                this.com = analysisReportInfo;
            },
            // 异常
            isError(row) {
                this.errorInfo = {
                    set_ids: [],
                    reason: '',
                    year: '',
                    plan_code: '',
                    student_code: '',
                    school_sid: '',
                    student_id: '',
                    plan_id: ''
                };

                this.errorInfo.plan_code = row.plan_code;
                this.errorInfo.student_code = row.student_code;
                this.errorInfo.school_sid = row.dep_id;
                this.errorInfo.student_id = row.id;
                this.errorInfo.plan_id = row.plan_id;
                this.errorInfo.year = row.year;
                this.errorModal = true;
            },
            // 分页
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
            },
            closeaddModal() {
                this.errorModal = false;
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001' && code !== '10202001' && code !== '10204001' && code !== '10205001' && code !== '10204002') { // 管理员, 教育局
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .reportList {
        thead {

            .ivu-table-cell {
                font-size: 14px !important;
            }

        }
    }

    .personSummaryReport-container {
        overflow: auto;
        // float: left;
        padding-left: 16px;

        .report-value-content {
            position: relative;
            padding-top: 10px;
            color: #000000;
            font-size: 14px;

            .qgInfo {
                float: left;
                margin-left: 8px;
                margin-top: -6px;

                .report-value {
                    span {
                        margin-right: 6px;
                        font-weight: normal;
                    }
                }
            }
        }

        .normal {
            font-weight: 600;
        }

        .report-error {
            font-size: 14px !important;
            color: #ed5145;
        }

        .report-normal {
            font-size: 14px !important;
            color: #299E97;
        }

    }

    .errorModal {
        .ivu-modal-body {
            padding: 16px 16px 0px 16px !important;

            .ivu-form-item {
                padding-left: 62px;
            }

            textarea.ivu-input {
                min-height: 120px !important;
            }

            .ivu-input-wrapper, .ivu-select {
                width: 250px !important;

            }

            .ivu-select-multiple .ivu-select-item-selected:after {
                color: #FF7B10 !important;
            }
        }
    }

    .anaysisModal {
        .ivu-modal-body {
            padding-bottom: 32px !important;
        }
    }

    .ivu-tooltip, .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }

    .myTjPrintTable {
        width: 658px;
        padding: 12px 5px 12px 5px;

        .reports_footer {
            margin-top: 10px;
            text-align: left;
            position: relative;
            display: flex;

            .sign {
                position: absolute;
                top: 30px;
                font-size: 12px;
                right: 100px;

                .line {
                    position: absolute;
                    width: 90px;
                    height: 1px;
                    border-bottom: 1px solid #000;
                    right: -90px;
                    top: 15px;
                }
            }

            .beizhu {
                flex: 1;
                font-size: 12px;
                text-align: left;
                margin-right: 170px;
            }

        }

        .baseInfo {
            margin-bottom: 4px;
            margin-top: 10px;
            font-size: 12px;

            .item {
                position: relative;
                // margin-top: 4px;
                height: 25px;

                div {
                    float: left;
                    text-align: left;
                    position: relative;

                    .line {
                        position: absolute;
                        width: 100px;
                        border-bottom: #333 1px solid;
                        left: 32px;
                        top: 20px;

                    }

                    .school {
                        width: 248px;
                    }

                    .grade {
                        width: 78px;
                    }

                    .class {
                        width: 44px;
                    }

                    .ID {
                        width: 190px;
                        left: 56px;
                    }

                    .date {
                        width: 103px;
                    }

                    .sex {
                        width: 80px;
                    }

                    .zhuzu {
                        width: 61px;
                        left: 55px;
                    }

                    .name {
                        width: 72px;
                    }

                    .history {
                        width: 580px;
                        left: 56px;
                    }

                }

            }

            .redDoted:after {
                content: '*';
                position: absolute;
                top: -4px;
                left: 48px;

            }
        }
    }

    .tj_reportTable {
        width: 635px;

        .dotted1 {
            position: relative;

            &:after {
                content: '*';
                position: absolute;
                // top:0px;
            }
        }

        .dotted2 {
            position: relative;

            &:after {
                content: '**';
                position: absolute;
                // top:0px;
            }
        }

        td {
            width: 45px;
            font-size: 12px;
            padding: 5px 2px 5px 5px;
            position: relative;

            .unit-float {
                position: absolute;
                right: 10px;
                // top: 50%;
                // transform:translateY(-50%);
                top: 5px;
                bottom: 0;
                margin: auto;
            }

            .unit-float1 {
                position: absolute;
                right: 0px;
                // top: 50%;
                // transform:translateY(-50%);
                top: 1px;
                bottom: 0;
                margin: auto;
            }
        }

        .tj_jielun {
            height: 46px;
        }

        .zhidao {
            height: 70px;
        }
    }

    .demo-spin-container {
        position: relative;
    }

    .nameunderline {
        position: relative;
        bottom: -6px;
        display: inline-block;
        width: 100px;
        border-bottom: 1px solid #000;
    }
</style>
