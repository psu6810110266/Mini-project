import React, { useState } from 'react';
import { Modal, Form, DatePicker, InputNumber, Button, message, Descriptions } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface BookingModalProps {
  visible: boolean;      // สถานะการเปิด/ปิด Modal
  onClose: () => void;   // ฟังก์ชันปิด Modal
  tourId: number;        // ID ของทัวร์ที่จะจอง
  tourName: string;      // ชื่อทัวร์
  price: number;         // ราคาต่อท่าน
}

const BookingModal: React.FC<BookingModalProps> = ({ visible, onClose, tourId, tourName, price }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // ป้องกันราคาเป็นค่าว่าง
  const safePrice = price || 0;

  const onFinish = async (values: any) => {
    // 1. ดึง Token และเช็คว่าล็อกอินจริงไหม (ดักจับค่า 'undefined' ที่เคยเจอ)
    const token = localStorage.getItem('app_token'); 
    if (!token || token === 'undefined') {
      message.error('กรุณาเข้าสู่ระบบก่อนจองนะครับ 🔒');
      return;
    }

    setLoading(true);
    try {
      // 2. เตรียมข้อมูล (Payload) ส่งไปที่ Backend
      const payload = {
        tourId: tourId,
        bookedSeats: values.seats,
        totalPrice: values.seats * safePrice,
        startDate: values.dates[0].format('YYYY-MM-DD'),
        endDate: values.dates[1].format('YYYY-MM-DD'),
      };

      console.log("🚀 ส่งข้อมูลจอง:", payload);

      // 3. ยิง API ไปที่เส้น /bookings
      await axios.post('http://localhost:3000/bookings', payload, {
        headers: { Authorization: `Bearer ${token}` }, // ส่ง Token แนบไปด้วย
      });

      message.success('✅ จองทัวร์สำเร็จแล้ว! ติดตามสถานะได้ที่ My Bookings');
      form.resetFields(); // ล้างข้อมูลในฟอร์ม
      onClose();          // ปิดหน้าต่าง
      
    } catch (error: any) {
      console.error("Booking Error:", error);
      // แสดง Error จาก Backend ถ้ามี
      message.error('❌ จองไม่สำเร็จ: ' + (error.response?.data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`🏝️ จองทัวร์: ${tourName || 'กำลังโหลด...'}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden // ใช้ตามคำแนะนำของ AntD เพื่อล้างข้อมูลเมื่อปิด
    >
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ seats: 1 }}>
        
        {/* รายละเอียดราคา */}
        <Descriptions column={1} bordered size="small" style={{ marginBottom: 16 }}>
          <Descriptions.Item label="ราคาต่อท่าน">
            <span style={{ color: '#0f1d45', fontWeight: 'bold' }}>
              {safePrice.toLocaleString()} บาท
            </span>
          </Descriptions.Item>
        </Descriptions>

        {/* เลือกวันที่เดินทาง */}
        <Form.Item 
          label="ช่วงเวลาเดินทาง" 
          name="dates" 
          rules={[{ required: true, message: 'กรุณาเลือกวันเดินทาง' }]}
        >
          <RangePicker 
            style={{ width: '100%' }} 
            // ห้ามเลือกวันที่ผ่านมาแล้ว
            disabledDate={(current) => current && current < dayjs().startOf('day')} 
          />
        </Form.Item>

        {/* จำนวนผู้เดินทาง */}
        <Form.Item 
          label="จำนวนท่าน" 
          name="seats" 
          rules={[{ required: true, message: 'กรุณาระบุจำนวนคน' }]}
        >
          <InputNumber min={1} max={20} style={{ width: '100%' }} />
        </Form.Item>

        {/* ส่วนแสดงราคารวมแบบ Dynamic */}
        <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.seats !== curValues.seats}>
          {() => {
            const seats = form.getFieldValue('seats') || 0;
            return (
              <div style={{ 
                textAlign: 'center', 
                fontSize: '20px', 
                fontWeight: 'bold', 
                margin: '20px 0', 
                color: '#1677ff',
                background: '#f0f5ff',
                padding: '10px',
                borderRadius: '8px'
              }}>
                ราคารวม: {(seats * safePrice).toLocaleString()} บาท
              </div>
            );
          }}
        </Form.Item>

        {/* ปุ่มยืนยัน */}
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading} 
          block 
          size="large" 
          style={{ height: '50px', fontSize: '16px', borderRadius: '8px' }}
        >
          ยืนยันการจองทัวร์
        </Button>
      </Form>
    </Modal>
  );
};

export default BookingModal;