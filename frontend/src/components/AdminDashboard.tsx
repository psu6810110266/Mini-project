import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // สีสำหรับกราฟ Pie Chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('app_token');
      try {
        const res = await axios.get('http://localhost:3000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
  if (!data) return null;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#0f1d45', marginBottom: '20px' }}>📊 Admin Dashboard</h2>

      {/* 1. ส่วน Summary Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Revenue" 
              value={data.totalRevenue} 
              prefix={<DollarCircleOutlined />} 
              suffix="฿" 
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Bookings" value={data.totalBookings} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Tours" value={data.totalTours} prefix={<GlobalOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Users" value={data.totalUsers} prefix={<UserOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* 2. ส่วนกราฟ Pie Chart แสดงทัวร์ยอดฮิต */}
      <div style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h3 style={{ textAlign: 'center' }}>🔥 Top 5 Popular Tours</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data.popularTours}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count" // ค่าตัวเลขที่จะใช้พลอตกราฟ
                nameKey="name"  // ชื่อทัวร์
                label
              >
                {data.popularTours.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}