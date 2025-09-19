import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "pages/Login";
import { LoginGuard } from "components/layout/LoginGuard";
import { AppLayout } from "components/layout/AppLayout";
import { Dashboard } from "pages/Dashboard";
import { Chat } from "pages/Chat";
import { Calendar } from "pages/Calendar";
import { Users } from "pages/Users";
import { NewTodo } from "pages/NewTodo";
import { EditUsers } from "pages/EditUsers";
import { Profile } from "pages/Profile";
import { UserInfo } from "pages/UserInfo";
import { use } from "hooks/use";
import {
  ManualeDellArtista,
  DalSognoAllaRealta,
  QuarantaModiPerNonProcrastinare,
  VideoMotivazionali,
  VideoPerLaMeditazione,
  ComeDiventareManagerLeaderDiTeStesso,
  MindsetMusicale,
  ProtocolloBusinessArtist,
  TecnicheDiSongwriting,
  MarketingMusicale,
  StrategiaDiMarketingMusicale,
  AttivaLaTuaCalamitaEnergetica,
} from "../pages/Documentations";
import Documentations from "../pages/Documentations/Documentations";

export const AppRoutes = () => {
  const user = use.useUser;

  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route
        index
        element={
          <LoginGuard>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/chat"}
        element={
          <LoginGuard>
            <AppLayout>
              <Chat />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/profile"}
        element={
          <LoginGuard>
            <AppLayout>
              <Profile />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/calendar"}
        element={
          <LoginGuard>
            <AppLayout>
              <Calendar />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation"}
        element={
          <LoginGuard>
            <AppLayout>
              <Documentations />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/manuale-dell-artista"}
        element={
          <LoginGuard>
            <AppLayout>
              <ManualeDellArtista />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/dal-sogno-alla-realta"}
        element={
          <LoginGuard>
            <AppLayout>
              <DalSognoAllaRealta />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/quaranta-modi-per-non-procrastinare"}
        element={
          <LoginGuard>
            <AppLayout>
              <QuarantaModiPerNonProcrastinare />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/video-motivazionali"}
        element={
          <LoginGuard>
            <AppLayout>
              <VideoMotivazionali />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/video-per-la-meditazione"}
        element={
          <LoginGuard>
            <AppLayout>
              <VideoPerLaMeditazione />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/come-diventare-manager-leader-di-te-stesso"}
        element={
          <LoginGuard>
            <AppLayout>
              <ComeDiventareManagerLeaderDiTeStesso />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/mindset-musicale"}
        element={
          <LoginGuard>
            <AppLayout>
              <MindsetMusicale />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/protocollo-business-artist"}
        element={
          <LoginGuard>
            <AppLayout>
              <ProtocolloBusinessArtist />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/tecniche-di-songwriting"}
        element={
          <LoginGuard>
            <AppLayout>
              <TecnicheDiSongwriting />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/marketing-musicale"}
        element={
          <LoginGuard>
            <AppLayout>
              <MarketingMusicale />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/strategia-di-marketing-musicale"}
        element={
          <LoginGuard>
            <AppLayout>
              <StrategiaDiMarketingMusicale />
            </AppLayout>
          </LoginGuard>
        }
      />
      <Route
        path={"/documentation/attiva-la-tua-calamita-energetica"}
        element={
          <LoginGuard>
            <AppLayout>
              <AttivaLaTuaCalamitaEnergetica />
            </AppLayout>
          </LoginGuard>
        }
      />
      {user?.is_admin && (
        <Route
          path={"/users"}
          element={
            <LoginGuard>
              <AppLayout>
                <Users />
              </AppLayout>
            </LoginGuard>
          }
        ></Route>
      )}
      {user?.is_admin && (
        <Route
          path={"/users/:id/todos/new"}
          element={
            <LoginGuard>
              <AppLayout>
                <NewTodo />
              </AppLayout>
            </LoginGuard>
          }
        ></Route>
      )}
      {user?.is_admin && (
        <Route
          path={"/todos/:todoId/edit"}
          element={
            <LoginGuard>
              <AppLayout>
                <NewTodo />
              </AppLayout>
            </LoginGuard>
          }
        ></Route>
      )}
      {user?.is_admin && (
        <Route
          path={"/users/:id/edit"}
          element={
            <LoginGuard>
              <AppLayout>
                <EditUsers />
              </AppLayout>
            </LoginGuard>
          }
        ></Route>
      )}
      {user?.is_admin && (
        <Route
          path={"/users/:id"}
          element={
            <LoginGuard>
              <AppLayout>
                <UserInfo />
              </AppLayout>
            </LoginGuard>
          }
        ></Route>
      )}
      <Route
        path={"*"}
        element={
          <LoginGuard>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </LoginGuard>
        }
      />
    </Routes>
  );
};
