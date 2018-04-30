import { combineReducers } from 'redux';
import { SESSION_INITIAL_STATE, ISessionStore, sessionReducer } from './session.store';
import { HOST_INITIAL_STATE, IHostStore, hostReducer } from './host.store';
import { TABLE_INITIAL_STATE, ITableStore, tableReducer } from './table.store';
import { REPORT_INITIAL_STATE, IReportStore, reportReducer } from './report.store';
import { REPORTER_INITIAL_STATE, IReporterStore, reporterReducer } from './reporter.store';
import { REPORTTYPE_INITIAL_STATE, IReportTypeStore, reportTypeReducer } from './reportType.store';
import { DESIGN_INITIAL_STATE, IDesignStore, designReducer } from './design.store';
import { CATEGORYMAIN_A_INITIAL_STATE,
        CATEGORYMAIN_B_INITIAL_STATE,
        CATEGORYMAIN_C_INITIAL_STATE,
        CATEGORYSUB_A_INITIAL_STATE,
        ICategoryMainAStore,
        ICategoryMainBStore,
        ICategoryMainCStore,
        ICategorySubAStore,
        categoryMainAReducer,
        categoryMainBReducer,
        categoryMainCReducer,
        categorySubAReducer} from './category.store';
import { MISC_INITIAL_STATE, IMiscStore, miscReducer  } from './misc.store';
import { TEAM_INITIAL_STATE, ITeamStore, teamReducer  } from './team.store';
import { LANGUAGE_INITIAL_STATE, ILanguageStore, languageReducer  } from './language.store';

export interface IAppState {
  session: ISessionStore,
  host: IHostStore,
  report: IReportStore,
  reporter: IReporterStore,
  reportType: IReportTypeStore,
  design: IDesignStore,
  categoryMainA: ICategoryMainAStore,
  categoryMainB: ICategoryMainBStore,
  categoryMainC: ICategoryMainCStore,
  categorySubA: ICategorySubAStore,
  misc: IMiscStore;
  team: ITeamStore;
  language: ILanguageStore;
}

export const INITIAL_STATE: IAppState = {
  session: SESSION_INITIAL_STATE,
  host: HOST_INITIAL_STATE,
  report: REPORT_INITIAL_STATE,
  reporter: REPORTER_INITIAL_STATE,
  reportType: REPORTTYPE_INITIAL_STATE,
  design: DESIGN_INITIAL_STATE,
  categoryMainA: CATEGORYMAIN_A_INITIAL_STATE,
  categoryMainB: CATEGORYMAIN_B_INITIAL_STATE,
  categoryMainC: CATEGORYMAIN_C_INITIAL_STATE,
  categorySubA: CATEGORYSUB_A_INITIAL_STATE,
  misc: MISC_INITIAL_STATE,
  team: TEAM_INITIAL_STATE,
  language: LANGUAGE_INITIAL_STATE,
}

export const rootReducer = combineReducers<IAppState>({
  session: sessionReducer,
  host: hostReducer,
  table: tableReducer,
  report: reportReducer,
  reporter: reporterReducer,
  reportType: reportTypeReducer,
  design: designReducer,
  categoryMainA: categoryMainAReducer,
  categoryMainB: categoryMainBReducer,
  categoryMainC: categoryMainCReducer,
  categorySubA: categorySubAReducer,
  misc: miscReducer,
  team: teamReducer,
  language: languageReducer,
});
