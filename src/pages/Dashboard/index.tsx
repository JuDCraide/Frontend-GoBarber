import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Appointment,
  Section,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>06</span>
            <span>Segunda</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="http://localhost:3333/files/588dd704e10e02c51a28-20190309_180219.jpg"
                alt="client.name"
              />
              <strong>client.name</strong>
              <span>
                <FiClock />
                13:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/588dd704e10e02c51a28-20190309_180219.jpg"
                  alt="client.name"
                />
                <strong>client.name</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                11:00
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/588dd704e10e02c51a28-20190309_180219.jpg"
                  alt="client.name"
                />
                <strong>client.name</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                13:00
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/588dd704e10e02c51a28-20190309_180219.jpg"
                  alt="client.name"
                />
                <strong>client.name</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
