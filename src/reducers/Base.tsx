import { connect } from "react-redux";
import container from "@/container/index";
import Route from "@/layuot/Route";
// 使用 connect 高阶组件对 Counter 进行包裹

export default connect(container.state)(Route);
