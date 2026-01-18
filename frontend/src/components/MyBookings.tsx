import { useEffect, useState, useCallback } from 'react';
import { List, Card, Tag, Typography, message, Spin, Empty, Modal } from 'antd'; // 🚩 เพิ่ม Modal
import { UserOutlined, CalendarOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; // 🚩 เพิ่ม Icon ตกใจ
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// ปรับ Interface ให้ตรงกับข้อมูลจริง
interface Booking {
  id: number;
  tour: {
    title: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  bookedSeats: number; // ใช้ bookedSeats ตามโค้ดล่าสุดของคุณ
  status: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. แยกฟังก์ชันดึงข้อมูลออกมาข้างนอก useEffect เพื่อให้เรียกใช้ซ้ำได้ตอนกด Cancel
  const fetchBookings = useCallback(async () => {
    const token = localStorage.getItem('app_token');
    
    if (!token || token === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      message.error('ไม่สามารถดึงข้อมูลการจองได้');
    } finally {
      setLoading(false);
    }
  }, []);

  // เรียกใช้ครั้งแรกตอนโหลดหน้า
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // 🚩 2. เพิ่มฟังก์ชัน Cancel พร้อม Modal ยืนยัน
  const handleCancel = (bookingId: number) => {
    const token = localStorage.getItem('app_token');

    Modal.confirm({
      title: 'ต้องการยกเลิกการจองใช่ไหม?',
      icon: <ExclamationCircleOutlined />,
      content: 'เมื่อยกเลิกแล้วข้อมูลจะหายไปจากระบบทันที',
      okText: 'ยืนยันยกเลิก',
      okType: 'danger',
      cancelText: 'ปิด',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          message.success('ยกเลิกการจองเรียบร้อย ✅');
          
          // ดึงข้อมูลใหม่ทันที เพื่อให้รายการที่ลบหายไปจากหน้าจอ
          fetchBookings(); 
        } catch (error) {
          message.error('ไม่สามารถยกเลิกได้ (คุณอาจไม่ใช่เจ้าของรายการนี้)');
        }
      },
    });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;

  if (bookings.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Empty description="ยังไม่มีรายการจองครับ ✈️" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Title level={3} style={{ marginBottom: '20px', color: '#0f1d45' }}>📅 My Bookings</Title>
      
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={bookings}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable style={{ borderRadius: '15px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                
                {/* ข้อมูลทัวร์ */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f1d45' }}>
                    {item.tour?.title || `Tour #${item.id}`}
                  </h3>
                  <div style={{ marginTop: '10px', color: '#666', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span><CalendarOutlined /> {dayjs(item.startDate).format('DD MMM YYYY')} - {dayjs(item.endDate).format('DD MMM YYYY')}</span>
                    <span><UserOutlined /> {item.bookedSeats} ท่าน</span>
                  </div>
                </div>

                {/* ส่วนราคา สถานะ และปุ่ม Cancel */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Tag color="green" style={{ fontSize: '14px', padding: '4px 10px', marginBottom: '10px' }}>Confirmed ✅</Tag>
                  
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Total Price</Text>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f1d45', marginBottom: '10px' }}>
                      ฿{Number(item.totalPrice).toLocaleString()}
                    </div>
                    
                    {/* 🚩 ปุ่ม Cancel ใส่ตรงนี้ */}
                    <button 
                      onClick={() => handleCancel(item.id)}
                      style={{
                        background: 'white',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        transition: '0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}