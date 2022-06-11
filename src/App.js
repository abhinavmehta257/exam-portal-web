import './App.css';
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { userInformation } from './redux/actions/UserActions';

// Lazy Loading For Admin.
const AdminPage = React.lazy(() => import('./component/adminPage/AdminPage'));
const AdminBulkUpload = React.lazy(() => import('./component/adminPage/AdminBulkUpload'));
const AddMetaData = React.lazy(() => import('./component/adminPage/AddMetaData'));
const AllQuestionsTable = React.lazy(() => import('./component/adminPage/AllQuestionsTable'));
const Competitions = React.lazy(() => import("./component/competition/competition"));
const ExamList = React.lazy(() => import("./component/competition/ExamList"));
const UserReports = React.lazy(() => import("./component/adminPage/UserReports"));
const PromoReport = React.lazy(() => import("./component/adminPage/PromoReport"));
const EditCompetition = React.lazy(() => import("./component/competition/EditCompetition"));

// Lazy Loading For Student
const FavoriteList = React.lazy(() => import('./component/Student/FavoriteList'))
const PracticeScreen = React.lazy(() => import('./component/Questions/PracticeScreen'));
const StudentHelp = React.lazy(() => import('./component/Student/StudentHelp'));
const StudentHomepage = React.lazy(() => import('./component/Student/StudentHomepage'));
const StudentPractice = React.lazy(() => import('./component/Student/StudentPractice'));

// Lazy Loading For Parent
const Parent = React.lazy(() => import('./component/parent/Parent'));
const ParentDashboard = React.lazy(() => import('./component/parent/ParentDashboard'));
const ParentMyPerformance = React.lazy(() => import('./component/parent/ParentMyPerformance'));
const ParentCreateUser = React.lazy(() => import('./component/parent/ParentCreateUser'));
const ParentStudentProfiles = React.lazy(() => import('./component/parent/ParentStudentProfiles'));


// Lazy Loading for general Pages
const HomePage = React.lazy(() => import('./component/homePage/HomePage'));
const CompetitionPage = React.lazy(() => import('./component/CompetionBattle/CompetionPage'));
const ParticipateComp = React.lazy(() => import('./component/CompetionBattle/ParticipateComp'));

const HelpPage = React.lazy(() => import('./component/homePage/HelpPage'));
const TermsAndConditions = React.lazy(() => import('./component/homePage/TermsAndConditions'));
const AboutUs = React.lazy(() => import('./component/homePage/AboutUs'));
const MembershipPage = React.lazy(() => import('./component/homePage/MembershipPage'));
const DownloadCMS = React.lazy(() => import('./component/adminPage/Download/DownloadCMS'));


function App() {
  const user = useSelector(selector => selector.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isLoggedIn) {
      dispatch(userInformation());
    }
  }, [dispatch, user.isLoggedIn])

  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" exact={true} element={<HomePage />} />
            <Route path="/admin" exact={true} element={<AdminPage />}>
              <Route path="/admin/upload" exact={true} element={<AdminBulkUpload />} />
              <Route path="/admin/information" exact={true} element={<AddMetaData />} />
              <Route path="/admin/question/list" exact={true} element={<AllQuestionsTable />} />
              <Route path="/admin/competitions" exact={true} element={<Competitions />} />
              <Route path="/admin/competitionlist/:page" exact={true} element={<ExamList />} />
              <Route path="/admin/edit-competition/:id" exact={true} element={<EditCompetition />} />
              <Route path="/admin/download" exact={true} element={<DownloadCMS />} />
              <Route path="/admin/information" exact={true} element={<AddMetaData />} />
              <Route path="/admin/question/list" exact={true} element={<AllQuestionsTable />} />
              <Route path="/admin/reports" exact={true} element={<UserReports />} />
              <Route path="/admin/reports/promo" exact={true} element={<PromoReport />} />
            </Route>

            <Route path="/parent" exact={true} element={<Parent />} >
              <Route path="/parent" exact={true} element={<ParentDashboard />} />
              <Route path="/parent/profiles" exact={true} element={<ParentStudentProfiles />} />
              <Route path="/parent/dashboard" exact={true} element={<ParentDashboard />} />
              <Route path="/parent/performance" exact={true} element={<ParentMyPerformance />} />
              <Route path="/parent/add/student" exact={true} element={<ParentCreateUser />} />
            </Route>

            <Route path="/student" exact={true} element={<StudentHomepage />} >
              <Route path="/student" exact={true} element={<StudentPractice />} />
              <Route path="/student/practice" exact={true} element={<StudentPractice />} />
              <Route path="/student/help" exact={true} element={<StudentHelp />} />
              <Route path="/student/favorites" exact={true} element={<FavoriteList />} />
            </Route>

            <Route path="/question" exact={true} element={<PracticeScreen />} />
            <Route path="/help" exact={true} element={<HelpPage />} />
            <Route path="/terms_and_conditions" exact={true} element={<TermsAndConditions />} />
            <Route path="/about_us" exact={true} element={<AboutUs />} />
            <Route path="/membership" exact={true} element={<MembershipPage />} />

            <Route path="/ParticipateComp" exact={true} element={<ParticipateComp />} />
            <Route path="/Competion" exact={true} element={<CompetitionPage />} />

          </Routes>
        </Router>
      </Suspense>
    </React.Fragment >
  );
}

export default App;
