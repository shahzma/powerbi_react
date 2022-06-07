import logo from './logo.svg';
import './App.css';
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: 'f87ed8df-7267-4a8a-835f-6a786edf57ed',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d',
            accessToken: "H4sIAAAAAAAEACWWxw6s1hJF_-VOsURuwJIH5JwzM3LOoQHr_ftryfM9Obuq1ln__rHSZ5jT4s_ff-iR_jZd6FG7UsBgunLbGyLUZ9sIgVAGRKSItnx2S7b2SiYA6CPea4DlguR30l0CzSnPh6XqnHv00sXe_uE_eZSJLEDQHFggSV8nxreJ3jFS8WD3JqF3G1g5Ylm9VRtGxuaV_fu7PmHokbpCsAodDO9TvvqAYhIEerDApJuveo7LIXS0fKThuNExktiB6HUbg-Pc4G4c7pdRJCL8Wd3ImbRqcU9I8w6SbpM8Q3LPQozDe0yqtFb4dMeUE4_5Zu6yTRPaxNM7vFlHL99csqYshRTYe-PqvjQGSaJ5rQIUiB5hZlwae_shJU_SlJkBHk6OOyJO_RSCBO30DXW7R6NC9gSFQ5C66CymqkFF250QgZaw7PbTd7ojws1DPlsHXgBgmsn63vlirr9E_lvVUXf0o8axK1RVnKx8CXwtz-G4sDrsc11X0TGRWm074ytW740rBwxS7ZjDITl_oVty8sz_RMOtRGbn0KRfhhvGy3oY76YvLv5q0K_fNF-vnDW0OvxVeg2RCinrrqcSvhTZQ9zs0I7mQYOUjARqoPo6e3LjqKM2mSi6MUvV94iT0StbaXl8-65Df3-8wEK0ZUSDuzewOHXuPone7UvCysBQrt2Rjqz1-1qEH0Ip7iW9iSgmMNHVmpRRh-2J17QLo8gbKMl2gI-r8nHFcrto7ockBxFwYkhA67C8nWc13S6LUeKk4wYFcr0etOTctiqzbE72VQl4b6Xlwzp1rGcxm1QH39aekgvNzJQDykZaaHgeXiq4EslH_JV01hBiQQyPej0iki87tNcGyMs2cPNRI2Jdjve4aRY5YpAH7MWw4eqGx386QYwBPQrd-s73FWbWBjic9SYVk2917fxoS59MYSgPoRqGpsTTYH63mbq_Z8Tl7WhNKD3IOOFrktyUZBjLRjqL6JuKMnUezgRyWwg5dwLJE8tetl8jBklRMjbgog_L6zWr9cUJfYv1G1e0Cv7dE56kBlYgQmsCrblr0Xg72ETwWUyJ1TQi17W2iTC6ebEEf6XqtcIzy2djR25RE3W1PRSMd0KGiMAw7rkAVCIvXZ19gbO4d6uVlTcd6gjSdjOHxWAoDwYYJ2wEAtzOREJoUE35MhJEz3I1LoKfcwfpM_UXx2RYGGCukdgvwbw7JITuVXTdmBAqr1FP76bmC5udPisRoHuvNuQ0UMRlj1TyFuEMilrMhWWFvC1W77Xsw8DdBELJMBw4ntkB9zTb8OgZT4gYPRuvJlwp63CduLPA9Amimnew1q_a7MQD1uhm70cUN5D5vLVkqiocgbgmUKTW_suphbiIAY3gBUeAaorgllERz0htLDVIN51bzahqQ52clGwAxWJ8yKYCXxV5Yw654A6hT5Jh5gmv1tyfyzSmpR1z3wd6USMuMqLWyiHvJDlGc_gFt-1tRzvEVoHvu7krIWhNV-JbwU9CNl7ii3z73ooU5uezlmrmvCy2RoPX5XNztslmyu5rRmCOUqSjPZlBiSWZvr8H0A6E2YBFRgu5pSXBt740EQ_7JTNHSTSzhFM6RNQBBEh8u3deF9_0t9fb0-dbID9ye8qQyXfIhbsQcLp46TzwMU9zyyDw8qV-oFTsmxcw3Hn28ZZ98ARuPij1Gtu9RfsYR7Qak7yXmJpTtnkKhrD0bFmUcO4zN7zwHdyEcdabOSBp4aVfTgDumwwx5xF8kObdsoe8bL2hyLlzZArshZfSO0CYGldoqyhbDfNddFvH4Vl6Rv9XV27JoAcSIFiUKdQBMmynMdYo0Dhw7Q_yvrq-ZprnR0s4nHIxHLp7-kZ_QaFnv3xAwgbbhLrJY3X12cDO2PfOjqtQ-AIhKv6Gfd4fgX0IqORthTLRU5bcnmKtD5Ip-XaSB6_l93p1jGDqu47xahQQvZIPUg6iq4dBdJ1lRfqWiNdp6AxPs7-A3HwkEHvy1UVMP3oURtPI5Opep3q8uNdnMAUw9xwU7u1jPLW-6wIlhbn04coiRiiL95CKSm1Rv0knxhS4iIY2ME2mOUHQhq7PX_WEhuTKvyLV-rzUde-cTez1W7EOPoDehgBXV_U8EsBiXHeuhlp3vD-flfUcBzmQFUJpJY1nki-ILJ-WMewy6JE91naoXCcd02E6XAdAe85R2j3u2rVVUE7qXo8THizU8GUN9kc8QheyEQroW2AxOVigusc503Bx2xd_uerdlTrpL5JEA6P6MROI5Hj_3OPK_37oagKWJEm0oSkPtRcRPnxhyGdJkak1epW77sN77IrwlGqfW22Lr5Z6FK2tObUF-nW3eQyuyqpcTmrhww2Mb0ryIU757TLTF3WsWAfYQ7RfzabzlWkw53jzNoLAwk8VHucBl2k-hBjWiL5pIikaZMH-AL-zhdgv7H0TEjHrcI0DC8MUq--8Lbcbv6rc-coegzV62-TFkSbUImwzmtnXjbnzBu5BVtRqnUP4Nj5vC1yFMHED4OmM0mXL0q4enzcBY3v9lySaGZ4LMCkcDBsRPO_PiqswE5R7q9AxX4dUa0uioJT7Kd-ruJuu8M2ExB5IXZ0sDt-___zz568_7PYsx6yWz0_zxrummloSeAv2kvBoskoDTiek42UPukFVvqd_35IVRmO82DS0y2NFV_sEiN4ccqfxia91K5hBSDCU9cEwQwXEnPGfmOlxZxVG9rM2Bzkd7EEKKvE-VsZymrwkvXGgGZnbtWNHeQTjysKys_C9P2uXQFDLvRoiTJf1FjdtCX2Hl2cIwxWEQeROUN8hNgOFWGexwvvqlFB0Xe5wtorNDVsglp1YqiaVB2Ntc9dh2yYSBEdy6oVKMGKhg52OUm_df-wbaxmKvbUzbqgwkl_rItB63VMZyT5CHh6ybh9CsOb5OVp06jGRBEiRh2BSfMqftp_lZu5cov-ctZ1cNa_641cm3E9T_1fzszTlJge_lvmkRc9LyKzpg0dmb303FjL_S7ltPaXHuZW_mGT4UqpRWGgsnB0mynkee0YDUVpWycbUDzY9AYBAckqN5dSIbLaqsriE-fG8b_qEaCOP2a0WrXeL7sgmKzJydPu7kG0URuG9R1MrpmERRMQ9mA0v_c_t0qU8QFv607TU7uJSOm7jsl3VedSfxLMGXn7rFGHVI_CsgCQhQQ75CSYA5AsH7-RIdg6TlnoDrECxDO7R3WvUBYqlncUzLtF40HI9uoFSM2GeyZN6tQ8KZbvhn-VrR9lry14JrZR6lETpBfhR1JYU22DNgDndlSOPKxpSmWG-aTfhRuEtk4tGg31oMCrYAxBYy_XGbr1KVImuJ_JIfFWdEVoxUFV28e3h-aHE_tX8v_8Df5G_2toMAAA=.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==",
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              background: models.BackgroundType.Transparent,
            }
          }}

          eventHandlers = { 
            new Map([
              ['loaded', function () {console.log('Report loaded');}],
              ['rendered', function () {console.log('Report rendered');}],
              ['error', function (event) {console.log(event.detail);}]
            ])
          }
            
          cssClassName = { "report-style-class" }

          getEmbeddedComponent = { (embeddedReport) => {
            window.report = embeddedReport ;
          }}
      />
      </header>
    </div>
  );
}

export default App;
