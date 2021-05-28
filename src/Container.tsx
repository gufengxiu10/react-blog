import { connect } from "react-redux";
import Layout from "@/layuot/Index";
import container from "@/container/index";
// 使用 connect 高阶组件对 Counter 进行包裹
export default connect(container.state)(Layout);
