import React from 'react'
import { Modal, Spin } from 'antd';
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from '../../../store';

const StyleSpinner = styled.div`
  display: flex;
  justify-content: center;
`
function LoadingFullScreen(props) {
  const { openModal } = useSelector((state) => ({
    openModal: state.global.isLoadingFullScreen,
  }))

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (true) {
    return (
        <Modal visible={openModal} footer={null} centered width={300}
        destroyOnClose={true} closable={false}>
          <StyleSpinner>
          <Spin indicator={antIcon} />
          </StyleSpinner>
        </Modal>
      )
  }
  return ''
}

export default LoadingFullScreen
