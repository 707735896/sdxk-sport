let urls = {};

let protocol = window.location.protocol;
let host = '';//window.location.host;
if (window.location.hostname === 'localhost') {//本地开发环境
    // host = 'tw.szedu.com';
    // host = '192.1.6.230:8080';
    host = '192.1.6.48:8088';
}
else if (window.location.port === '9101') {
    host = window.location.hostname + ':8080';
} else if (window.location.port === '9091') {
    host = window.location.hostname + ':8088';
}
else {
    // host = '172.18.8.138' + ':' + window.location.port; //  教育局地址 ===ip
    host = window.location.hostname + ':' + window.location.port; //  教育局地址 ===域名
    // host = '192.1.6.48:8080';
    // host = window.location.hostname + ':8080';
}
host += '/EduPhyHea';
// base Url 前端API调用地址
urls.baseApi = protocol + '//' + host;

urls.login = '/SysUser/Login';//登录
urls.getMenuPermision = '/SysFunction/GetFunctionByLogin'; // 获取权限路由
urls.getNowDayByDoctor = '/MedicalPlan/GetNowDayByDoctor'; // 获取排队信息
urls.getQuene = '/MedicalPlan/GetQueuingInfo'; // 获取排队信息

// 模板下载地址
urls.teacher_down = urls.baseApi + '/static/老师信息导入模板.xlsx';
urls.student_down = urls.baseApi + '/static/学生信息导入模板.xlsx';
urls.class_down = urls.baseApi + '/static/班级信息导入模板.xlsx';
urls.student1 = urls.baseApi + '/static/学生升学体检名单导入模板.xlsx'; // 升学体检模板
urls.student2 = urls.baseApi + '/static/学生健康体检名单导入模板.xlsx'; // 健康体检模板
urls.student_export = urls.baseApi + '/static/体检结果导入模板.xlsx'; // 体检结果导入模板


// 导入
urls.teacher_up = urls.baseApi + '/Teacher/ImportExcel';


// 下拉列表
urls.unit_opt_list = '/sysdepartment/GetUnitInfAllListByType';// 1教育局2学校3医院4体科所
urls.grade_list = '/sysdepartment/GetGradesByUnitId'; // 根据学校获取年级下拉列表 // id="2"
urls.grade_all_list = '/SysDictionaryCategory/GetDictionaryByCategoryId'; // 所有年级下拉列表
urls.class_all_list = '/Classno/GetClassAllList'; // 根据 学校id，年级id获取对应班级
urls.unit_all_list = '/sysdepartment/GetUnitInfAllList'; //单位列表
urls.section_all_list = '/HospitalDep/GetHosDepListByUnitId'; // 根据医院id获取对应科室
urls.grade_no_list = '/Dictionary/GetGradeNoBySchool';

urls.new_grade_list = '/Dictionary/GetSchoolToGrader';
urls.new_class_list = '/ClassManagement/GetGraderToClass';

//公共
urls.examination_itembytype = 'PhysicalType/GetPhysicalListBytype';//根据体检类型获取选中的项目


// 上传图片
urls.uploadImage = urls.baseApi + '/FileUpload/fileUpload';
// 小程序管理图片上传
urls.uploadImage_wechat = urls.baseApi + '/WechatHealthyinfo/uploadImage_bd';

//用户信息
urls.user_list = '/SysUser/GetList';//列表
urls.user_edit = '/SysUser/Update';//修改
urls.user_add = '/SysUser/Add';//新增
urls.user_all = '/SysUser/GetAll';//获取所有

urls.user_update = '/SysUser/Update';//修改
urls.user_status = '/SysUser/Operation';//状态
urls.user_info = '/SysUser/GetById';//根据id获取某一个
urls.user_reset = '/SysUser/ResetPassord';//重置密码
urls.user_dept = '/SysDepartment/GetAll';//获取部门
urls.manage_list = '/Taskmanagement/GetTaskManageAll';//获取任务
urls.ChangePassword = '/SysUser/ChangePassword';//修改密码

// 区域
urls.area_list = '/Area/GetList';
urls.area_add = '/Area/Add';
urls.area_status = '/Area/Operation';
urls.area_edit = '/Area/Update';
urls.area_info = '/Area/GetById';
urls.area_all_list = '/Area/GetAll';


//角色信息
urls.role_list = '/SysRole/GetList';//列表
urls.role_all = '/SysRole/GetAll';//获取角色下拉列表
urls.role_child = '/SysRole/GetChild';//获取角色下拉列表 child
urls.role_add = '/SysRole/Add';//新增
urls.role_edit = '/SysRole/Update';//编辑
urls.role_operation = '/SysRole/Operation';//状态
urls.role_function = '/SysFunction/GetList';//获取菜单普通下拉列表
urls.function_all = '/SysFunction/GetAll';//配置权限
urls.add_role_function = '/SysRoleFunction/AddRoleFunction';//
urls.getFunction = '/SysRole/GetFunctions';//配置权限

urls.role_fun = 'SysFunction/GetFunctionByRoleid';

//字典表类别管理
urls.dic_type = '/DictionaryCategory/GetList';//字典表类别列表
urls.dic_add = '/DictionaryCategory/Add';//新增
urls.dic_update = '/DictionaryCategory/Update';//修改
urls.dic_status = '/DictionaryCategory/Operation';//状态
urls.dic_all = '/DictionaryCategory/GetAll';//所有

//字典表信息管理
urls.dictionary_info = '/Dictionary/GetList';//字典表信息列表
urls.dictionary_add = '/Dictionary/Add';//新增
urls.dictionary_edit = '/Dictionary/Update';//修改
urls.dictionary_status = '/Dictionary/Operation';//状态
urls.dictionary_id = '/Dictionary/GetById';//状态
urls.dictionary_tree = '/Dictionary/GetTreeAll';//树

//通知管理
urls.task_list = '/Taskmanagement/GetList';//通知管理列表1
urls.task_list_index = '/Taskmanagement/GetReceivedList';//通知管理列表2
urls.task_add = '/Taskmanagement/Add';//新增
urls.task_operation = '/Taskmanagement/Operation';//操作

// 小程序用户管理
urls.applet_list = '/WechatParentinfo/WechatParentinfodatalist';//用户管理列表1
urls.applet_list_index = '/WechatParentinfo/GetWechatParentinfoById';//通知管理列表2
urls.applet_add = '/WechatParentinfo/AddWechatParentinfo';//新增
urls.applet_update = '/WechatParentinfo/UpdateWechatParentinfo';//修改
urls.applet_status = '/WechatParentinfo/DeleteWechatParentinfo';//状态
urls.applet_reset = '/WechatParentinfo/ResetPwd';//重置密码

//健康资讯维护
urls.healthyinfo_list = '/WechatHealthyinfo/WechatHealthyinfodatalist';//资讯列表
urls.healthyinfo_list_index = '/WechatHealthyinfo/GetWechatHealthyinfoById';//通知管理列表2
urls.healthyinfo_add = '/WechatHealthyinfo/AddWechatHealthyinfo';//新增
urls.healthyinfo_update = '/WechatHealthyinfo/UpdateWechatHealthyinfo';//修改
urls.healthyinfo_delete = '/WechatHealthyinfo/DeleteWechatHealthyinfo';//删除
urls.healthyinfo_reset = '/WechatParentinfo/ResetPwd';//重置密码


//字典值
urls.dictm_all_list = '/Dictionary/GetAll';

//日志
urls.system_log = '/SysLog/GetList';
urls.system_info = '/SysLog/GetById';

// // 单位信息管理 // 页面拆分成医疗机构和学校
// urls.unit_tree = '/sysdepartment/GetUnitTreesByKeyWord'; //左侧树
// urls.unit_page_list = '/sysdepartment/GetUnitInfList'; // 列表
// urls.unit_add = '/sysdepartment/AddUnitInf'; // 新增
// urls.unit_edit = '/sysdepartment/UpdateUnitInf'; //编辑
// urls.unit_status = '/sysdepartment/OperaUnitInf'; // 启用。禁用
// urls.unit_info = '/sysdepartment/GetUnitInfById'; // 详情


//体质监测基础信息管理
urls.MonStaff_list = 'MonStaff/GetList';
urls.MonStaff_add = 'MonStaff/Add';
urls.MonStaff_edit = '/MonStaff/Update';
urls.MonStaff_status = 'MonStaff/Operation';

// 医疗机构或学校
urls.dept_list = '/SysDepartment/GetList';
urls.dept_add = '/SysDepartment/Add';
urls.dept_edit = '/SysDepartment/Update';
urls.dept_status = '/SysDepartment/Operation';
urls.dept_info = '/SysDepartment/GetById';
urls.dept_all_list = '/SysDepartment/GetAll';

// 班级信息管理
urls.class_list = '/ClassManagement/GetList'; // 列表
urls.class_add = '/ClassManagement/Add'; // 新增
urls.class_edit = '/ClassManagement/Update'; //编辑
urls.class_status = '/ClassManagement/Operation'; // 启用。禁用
urls.class_info = '/ClassManagement/GetById'; // 详情
urls.class_all_lists = '/ClassManagement/GetAll';
urls.class_import = urls.baseApi + '/ClassManagement/ImportExcel'; // 导入

// 科室信息管理
urls.section_list = '/HospitalDep/GetList'; // 列表
urls.section_add = '/HospitalDep/Add'; // 新增
urls.section_edit = '/HospitalDep/Update'; //编辑
urls.section_status = '/HospitalDep/Operation'; // 启用。禁用
urls.section_info = '/HospitalDep/GetById'; // 详情
urls.section_all_lists = '/HospitalDep/GetAll';

//医生
urls.doctor_list = '/Doctor/GetList';
urls.doctor_add = '/Doctor/Add';
urls.doctor_edit = '/Doctor/Update';
urls.doctor_status = '/Doctor/Operation';
urls.doctor_info = '/Doctor/GetById';
// urls.doctor_all_list = '/Doctor/GetById';

// 工作人员管理
urls.staff_list = '/Employee/GetEmployeeList'; // 列表
urls.staff_add = '/Employee/AddEmployee'; // 新增
urls.staff_edit = '/Employee/UpdateEmployee'; //编辑
urls.staff_status = '/Employee/OperaEmployee'; // 启用。禁用
urls.staff_info = '/Employee/GetEmployeeById'; // 详情
urls.teacher_list = '/Employee/GetEmpListByType'; //  医生/教师列表 2:教师,3:医生

// 1老师2体育老师3校医
urls.teacher_lists = '/Teacher/GetList';
urls.teacher_add = '/Teacher/Add';
urls.teacher_edit = '/Teacher/Update';
urls.teacher_status = '/Teacher/Operation';
urls.teacher_info = '/Teacher/GetById';
urls.teacher_all_list = '/Teacher/GetAll';

// 学生信息管理
urls.student_list = '/StudentInfo/GetList'; // 列表
urls.student_add = '/StudentInfo/Add'; // 新增
urls.student_edit = '/StudentInfo/Update'; //编辑
urls.student_status = '/StudentInfo/Operation'; // 启用。禁用
urls.student_info = '/StudentInfo/GetById'; // 详情
urls.get_student_count = '/StudentInfo/GetClassTotalByClassId';
urls.student_import = urls.baseApi + '/StudentInfo/ImportExcel';

//统一体检
//学生体检名单校对
urls.proofreading_list = '/StudentListAnamnesis/GetList';//列表
urls.proofreading_add = '/StudentListAnamnesis/Add';//新增
urls.proofreading_update = '/StudentListAnamnesis/Update';//编辑
urls.proofreading_info = '/StudentListAnamnesis/GetById'; //详情
urls.proofreading_status = '/StudentListAnamnesis/Operation'; // 启用/禁用。删除
urls.proofreading_upload = urls.baseApi + '/StudentListAnamnesis/ExportJieHeList'; // 下载

//临时名单
urls.temporary_list = '/StudentInfo/GetStuList';//列表
urls.temporary_add = '/StudentInfo/AddstuToPlan';//新增
urls.temporary_edit = '/StudentInfo/UpdateStuIno';//编辑

urls.temporary_info = '/StudentInfo/GetOneStu';//详情
urls.temporary_del = '/StudentInfo/DeleteStuIno';//删除
urls.temporary_plan = '/MedicalPlan/GetPLanByDoctor';//获取计划


//体检数据导入
urls.user_data_import = '/UserResult/ImportExcel';
//体检数据导出
urls.user_data_export = urls.baseApi + '/UserResult/ExportExcel';

// 二维码打印
urls.studentqrcode_list = '/StudentListAnamnesis/GetStudentsByTeacher';//列表

// 学生上报列表 班级人数审核
urls.student_bao_list = '/StudentListAnamnesis/GetStuAmountList'; //
urls.student_bao_add = '/CheckClassCount/AddAll'; // 上报
urls.class_check = '/CheckClassCount/GetClassNo'; //上报班级列表
urls.class_check_list = '/CheckClassCount/GetAll';
urls.student_check_import = urls.baseApi + '/StudentListAnamnesis/ImportExcel';

//==========体检计划
urls.media_list = '/MedicalPlan/GetList';
urls.media_add = '/MedicalPlan/Add';
urls.media_edit = '/MedicalPlan/Update';
urls.media_status = '/MedicalPlan/Operation';
urls.media_info = '/MedicalPlan/GetById';
urls.media_plan = '/MedicalPlan/SchedulePlan';
urls.update_time = '/MedicalPlan/updatePlanTime';

urls.set_objects_list = '/PhysicalPlan/GetPhysicalPlanList';//列表
urls.add_object = '/PhysicalPlan/AddPhysicalPlan';          //新增
urls.edit_object = '/PhysicalPlan/UpdatePhysicalPlan';      //编辑
urls.object_detail = '/PhysicalPlan/GetPhysicalPlanById';   //详情
urls.object_opera = '/PhysicalPlan/OperaPhysicalPlan';      //启用/禁用

//体检排程
urls.schedule_list = '/PhysicalPlan/GetArrangePlandatalist';//列表
urls.schedule_detail = '/PhysicalPlan/GetPhysicalPlanById'; //详情
urls.schedule_req = '/PhysicalPlan/ArrangePhysicalPlan'; //排程

//体检准备
urls.examination_config_list = '/PhysicalLimit/GetPhysicalLimitListBySetId'; //参考值列表
urls.examination_config_add = '/PhysicalLimit/OperaNormalPhysicalLimit';//正常值新增
urls.examination_retest_add = '/PhysicalLimit/OperaAbNormalPhysicalLimit';//复测值新增

//体检项目规划
urls.examination_plan_list = '/PhysicalType/GetCheckedPhysicalTypeList';//选中列表
urls.examination_plan_check = '/PhysicalType/AddPhysicalTypeList';//选中
urls.medicaltype_list = '/MedicalType/GetList';
urls.medicaltype_add = '/MedicalType/Add';
urls.medicaltype_edit = '/MedicalType/UpdateMedicalType';
urls.medicaltype_status = '/MedicalType/Operation';
urls.medicaltype_info = '/MedicalType/GetById';
urls.medicaltype_tree = '/MedicalType/GetMedicalTypeTree';

//体检执行
urls.examination_tubAndCom_list = '/StudentListAnamnesis/GetTubAndComList';//既往结核病史和接触史名单
urls.examination_download_list = urls.baseApi + '/StudentListAnamnesis/ExportTubANdCom';//名单下载


//家长反馈
urls.examination_feedback_list = '/ParentsFeedback/ParentFeedbackList';//列表
urls.examination_feedback_info = '/ParentsFeedback/ParentFeedbackDetails';//列表

//体检队伍
urls.examination_team_list = '/PhysicalTeam/GetPhysicalTeamList';//列表
urls.examination_team_status = '/PhysicalTeam/OperaPhysicalTeam'; //启用禁用
urls.examination_team_add = '/PhysicalTeam/AddPhysicalTeamAndDetail';//新增
urls.examination_team_edit = '/PhysicalTeam/UpdatePhysicalTeamAndDetail';//编辑
urls.examination_team_info = '/PhysicalTeam/GetAllPhysicalTeamById';//详情

//体检报告
urls.examination_personsummary_list = '/FinalResult/GetEleFinalResultList'; //个人体检报告列表
urls.examination_personsummary_analyze = '/PhysicalCourse/GetReportByStudentId';//个人体检报告分析

// 电子体检报告
urls.elec_list = '/UserResult/GetMedicalList';
urls.elec_get_one = '/UserResult/GetSingleMedical';


//健康体测
//体测项目规划
urls.getProPlan_list = '/ProjectProgram/GetProProgramList';//获取列表
urls.updateProPlan_list = '/ProjectProgram/UpdateProProgramList';//更新一条

//健康体测-体侧报告-电子体测报告
urls.elecPhysicalReport_list = '/FitnessCourse/GetReportFormsList';//列表
urls.elecPhysicalReport_analyze = '/FitnessCourse/GetReportForms';//分析和详情

//健康体测 体测项目参考值
urls.elecPhysical_Para_list = '/FitnessTestSet/GetAllSet';//体测项目参考值列表
urls.elecPhysical_Para_info = '/ParamConfig/GetParamConfigBySetId';//详情
urls.elecPhysical_Para_edit = '/ParamConfig/UpdateParamConfig';//修改
urls.elecPhysical_Para_byid = '/ParamConfig/GetParamConfigInfoById';

// 体侧统计
urls.fit_chart = 'StaminaReport/ReportStaminaStatistics';


//体测计划规划
urls.add_physical_object = '/FitnessPlan/AddFitnessPlan'; // 新增体侧对象
urls.get_physical_object = '/FitnessPlan/GetFitnessPlanById'; // 获取体侧对象详情
urls.get_physical_object_list = '/FitnessPlan/GetFitnessPlanList'; // 获取体侧设置对象列表
urls.edit_physical_object = '/FitnessPlan/UpdateFitnessPlan'; // 编辑体侧对象
urls.status_physical_object = '/FitnessPlan/OperaFitnessPlan'; // 禁用启用体侧对象
urls.time_physical_object = '/FitnessPlan/ArrangeFitnessPlan'; // 排程时间
urls.plan_physical_list = '/FitnessPlan/GetPlanArrDatalist'; // 排程列表
urls.app_physical = 'ApproveRecord/AddFitNessApproveRecord'; // 审核
urls.app_physical_list = 'ApproveRecord/GetFitNessApproveRecordList'; // 审核列表

// 体测统计汇总
urls.project_list = '/FitnessTestSet/GetAllSet';
urls.sets_list = '/Dictionary/GetAllSets';
urls.area_report_list = '/FitnessCourse/GetAreaFitnessCourseTotal';//区域汇总报告单


// 体侧导出
urls.fit_export = urls.baseApi + '/UserResult/ExportFit';
urls.fit_file = urls.baseApi + '/static/体测结果导入模板.xlsx';
urls.fit_upload = '/UserResult/ImportFitness';

// 校医复测
urls.retest_list = '/TeacherRetest/GetList';//列表
urls.retest_edit = '/TeacherRetest/Compile';//修改
urls.retest_single_info = '/UserResult/GetSingleMedical';//单条详情数据
urls.re_gradeList = '/SysDepartment/GetAllGender';//年级
urls.one_key_submission = '/TeacherRetest/ButtonToSubmit'; //一键提交

//打印体检报表
urls.print_reports = '/UserResult/PrintMedical';//返回打印url

//单个用户体检结果分析
urls.get_single_info = '/MedicalUnusual/ReportAnalysis';//单条分析数据
// 数据异常提交
urls.commit_anomalous_info = '/TeacherRetest/InsertAll';//复测异常数据


// 统计汇总
urls.chart = '/MedicalReport/StatisticalBarChart'; // chart
urls.reports_summary = '/MedicalReport/ReportSummaryStatistics';//体检报告单汇总
urls.get_first_phyItem = '/MedicalType/GetPhysicalItemList';//获取一级体检项目
urls.get_second_phyItem = '/PhysicalSets/GetDetailedItems';//获取二级体检项目

urls.jiehe_list = '/StudentListAnamnesis/GetJieHeList';//结核病筛查列表
urls.categery_list = '/StudentListAnamnesis/GetSearchCategery';//获取所有查询类别


// 体质监测

// 监测准备

urls.monitorStudent_list = '/MonStudent/GetList'; // 监测学生列表
urls.monitorStudent_state = '/MonStudent/Operation'; // 监测名单启用禁用
urls.monitorStudent_info = '/StudentListAnamnesis/GetById'; // 监测名单详情
urls.monitorStudent_upload = '/MonSchCount/Add'; // 监测名单上传
urls.monitorStudent_update = '/MonSchCount/Update'; // 监测名单更新
urls.monitorStudent_downLoad = urls.baseApi + '/MonStudent/ExportMonStuList'; // 监测名单下载


urls.monitorProject_list = '/MonSet/GetSetPlanList'; // 监测项目规划列表
urls.monitorProject_update = '/MonSetPlan/Update'; // 监测项目规划修改

urls.monitorTeam_list = '/MonTeam/GetList'; // 监测队伍配置列表
urls.monitorTeam_state = '/MonTeam/Operation'; // 监测队伍启用禁用
urls.monitorTeam_info = '/MonTeam/GetTeamById'; // 根据id获取监测队伍详情
urls.monitorTeam_add = '/MonTeam/Add'; // 监测队伍新增
urls.monitorTeam_update = '/MonTeam/Update'; // 监测队伍编辑
urls.monitorTeam_staff = '/MonStaff/GetAll'; // 获取监测人员
urls.monitorTeam_set_name = '/MonSet/GetAllTwo'; // 获取监测项目

urls.monitorPlan_list = '/MonPlan/GetList'; // 监测计划规划列表
urls.monitorPlan_state = '/MonPlan/Operation'; // 监测计划规划启用/禁用
urls.monitorPlan_info = '/MonPlan/GetById'; // 监测计划规划详情
urls.monitorPlan_add = '/MonPlan/Add'; // 监测计划规划新增
urls.monitorPlan_update1 = '/MonPlan/Update'; // 监测计划规划编辑
urls.monitorPlan_count = '/MonSchCount/GetAllMonSchCount'; // 监测计划规划编辑
urls.monitorTeam_selector = '/MonTeam/GetAll'; // 监测队伍下拉
urls.monitorPlan_Schedule = '/MonPlan/Schedule'; // 监测计划排程


urls.monitorStu_choose = '/MonStudent/GetSchoolStu'; // 体质抽查列表
urls.monitorStu_confirm = '/MonStudent/AddAll'; // 体质抽查批量保存
urls.monitorStu_AllList = '/MonStudent/GetAllSchool'; // 获取已抽数据
urls.monitorStu_all_stu = '/MonStudent/GetAllMonStu'; // 获取已抽学校的学生
urls.monitorStu_delete = '/MonStudent/DeleteStuBySch'; // 删除已抽学校的学生


//监测数据导出
urls.monitor_data_exports =urls.baseApi +  '/MonStudent/ExportMon';

// 监测汇总报表
urls.all_monitor_data = 'MonReport/PMStatisticalReport'; //
urls.all_der_data = 'MonReport/GetDerivedReport'; // 派生
urls.shengli = 'MonReport/GetAvgReport'; //平均值

urls.monitorReport = '/MonStudent/GetMonReportList';//监测个人报表
urls.monitorReport_info = '/MonStudent/GetOneMonReport';//监测个人报表详情
urls.monitor_item_select = '/MonSet/GetAll';//监测个人报表详情
urls.monitorReport_analysis = '/MonUnusual/ReportAnalysis';//监测个人报表分析
urls.monitor_eye = 'MonEyesight/ReportToEyes'; // 视力图表
urls.monitor_kou = 'MonStomatology/ReportStomatology';// 口腔


// 数据录入
urls.data_entry_list = 'FitnessCourseTemp/GetList';
urls.data_update = 'FitnessCourseTemp/AddUpdate';
urls.data_submit = 'FitnessCourseTemp/SubmitFitness';

// 校医追踪
urls.follow_list = 'TrRecord/GetMedicalList'; //
urls.follow_info = 'TrRecord/GetTrById';
urls.follow_submit = 'TrRecord/updateTr';

// 大屏
urls.big_screen = 'SginInRecord/GetCountByPlan';
urls.get_plan_id = 'MedicalPlan/GetPLanByLogin';

// 家长书
urls.parent_list = 'UserResult/GetParentList';
urls.parent_info = 'UserResult/ReportAnalysis';

export default urls;
