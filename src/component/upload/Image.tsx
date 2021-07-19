import React from "react";
import { Modal, Upload, Spin } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Img } from "react-image";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/index.css";
import "./image.scss";
export default class Save extends React.Component<any, any> {
  state = {
    previewVisible: false,
    previewTitle: "",
    visible: false,
    spin: false,
  };

  constructor(props: any) {
    super(props);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  upload = (info: any) => {
    if (info.file.status == "done") {
      const path = "/" + info.file.response.data.path;

      this.setState({
        spin: false,
      });

      if (typeof this.props.done == "function") {
        this.props.done(path);
      }
    } else if (info.file.status == "uploading") {
      this.setState({ spin: true });
    }
  };

  render = (): JSX.Element => {
    return (
      <>
        <Spin spinning={this.state.spin}>
          <div className="img">
            <img
              src={this.props.src}
              style={Object.assign({ minHeight: "100px" }, this.props.style)}
            />
            <div className="shade">
              <div className="shade-body">
                <div>
                  <EyeOutlined
                    style={{ color: "#fff", fontSize: "20px" }}
                    onClick={() => {
                      this.setState({ visible: true });
                    }}
                  />
                </div>
                <div className="upload">
                  <Upload
                    name="file"
                    listType="picture"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/upload"
                    onChange={this.upload}
                  >
                    <UploadOutlined
                      style={{ color: "#fff", fontSize: "20px" }}
                    />
                  </Upload>
                </div>
              </div>
            </div>
          </div>
          <PhotoSlider
            images={[{ src: this.props.src }]}
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false });
            }}
          />
        </Spin>
      </>
    );
  };
}
