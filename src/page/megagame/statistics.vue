<template>
	<div id="subpage">
		<div class="content">
			<div class="xcx-h1">日统计详情</div>
			<div class="xcx-head">
			</div>
			<div class="xcx-content">
				<!--列表-->
				<el-table :data="tableData.slice((page - 1) * 10, page * 10)" border style="width: 100%">
					<el-table-column prop="date" label="日期"></el-table-column>
					<el-table-column prop="total_user_count" label="引流人数"></el-table-column>
					<el-table-column prop="register_count" label="注册人数"></el-table-column>
				</el-table>

				<!--分页-->
				<div class="paging">
					<el-pagination class="left" @current-change="handleCurrentChange" :current-page="page" :page-size="limit" background layout="prev, pager, next,slot" :total="count"></el-pagination>
					<span class="demonstration left">共 {{ count }} 条 每页10条</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="../../../static/js/megagame/statistics.js"></script>
<style scoped>
@import "../../../static/css/megagame/statistics.css";
</style>