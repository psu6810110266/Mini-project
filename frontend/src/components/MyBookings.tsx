import { useEffect, useState } from 'react';
import { List, Card, Tag, Typography, message, Spin, Empty } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// ปรับ Interface ให้ตรงกับข้อมูลจริงที่ Backend ส่งมา
interface Booking {
  id: number;
  tour: {         // 🚩 ข้อมูลทัวร์จะมาเป็น Object
    title: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  bookedSeats: number;
  status: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      // 🚩 แก้จุดที่ 1: เปลี่ยนจาก 'access_token' เป็น 'app_token'
      const token = localStorage.getItem('app_token'); 
      
      if (!token || token === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("ข้อมูลที่ดึงมาได้:", res.data); // 🔎 ดูโครงสร้างจริงใน Console
        setBookings(res.data);
      } catch (error) {
        console.error(error);
        message.error('ไม่สามารถดึงข้อมูลการจองได้');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
                
                <div style={{ flex: 1 }}>
                  {/* 🚩 แก้จุดที่ 2: เรียกชื่อทัวร์จาก item.tour.title */}
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f1d45' }}>
                    {item.tour?.title || `Tour #${item.id}`}
                  </h3>
                  <div style={{ marginTop: '10px', color: '#666', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span><CalendarOutlined /> {dayjs(item.startDate).format('DD MMM YYYY')} - {dayjs(item.endDate).format('DD MMM YYYY')}</span>
                    <span><UserOutlined /> {item.bookedSeats} ท่าน</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Tag color="green" style={{ fontSize: '14px', padding: '4px 10px' }}>Confirmed ✅</Tag>
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Total Price</Text>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f1d45' }}>
                      ฿{Number(item.totalPrice).toLocaleString()}
                    </div>
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