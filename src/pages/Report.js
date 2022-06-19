import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import styled from 'styled-components';
import './Report.css';
import React, { useState, useEffect } from 'react';

function Report() {

  const [ AccessToken, setAccessToken ] = useState([]);
  // runs on first render
    useEffect(() => {
      let accessTokenData = {
        'grant_type':'password',
        'username':'shahzma@redseermanagement.onmicrosoft.com',
        'password':'Redseer@2022',
        'client_id': '02400d3c-8927-4b2c-b339-66ea70f63810',
        'client_secret': '50~8Q~z4-HPZRuIQCQ170E1w9ZdKEydV9~ICoblD',
        'resource': 'https://analysis.windows.net/powerbi/api'
      }
      let formbody = [];
      for (let property in accessTokenData) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(accessTokenData[property]);
        formbody.push(encodedKey + "=" + encodedValue);
      }
      formbody = formbody.join("&");

      fetch(`https://login.microsoftonline.com/common/oauth2/token`, {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formbody
      })
      .then( data => data.json())
      .then(
      data => {
          setAccessToken(data)
          console.log(data['access_token'])
      }
      )
      .catch( error => console.error(error))
  }, []);
  return (
        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: 'f87ed8df-7267-4a8a-835f-6a786edf57ed',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d',
            accessToken: "H4sIAAAAAAAEACWWRQ7sCBJE7_K3HslMI_XCzOwy7czMdhlac_cpde9TmcpQKF78_cdOn2FOiz___ZPg5LZO99cvkjI4MDj4BAtVC52Y0hrVauOSBzMboNVxuQMvJyoUjmihCEaNw9jqypMlgGs5Z-uXR1UxdcfZ2JzThINAxRhvfq9yrBZkfMGP-HlQdwxu4Ak0xT-bwozgDtkQIQLFAOGPCeklfLdbCG4Bbf-oeBajrNNFLJD6-FSIemPj3cWKH4QAP9G13V9cqgK3bO1d3pVOb8Du429Lsp5zm2SX7lHZ_Pnd1uHRYyDXYALYGvHE4azP5KhSLy1zoFjLqN5tZm8upUo399GJq3W2MenrCh0e0AbOKt3zLW6n7x03v43khesmgoUi3s3qeCvsM1cyY2iVVJPHl2VP6KzTctIR6EvwAF7YAH4mSjmfz1XoURi95A1eTLaRXnrun-dZcUyAHvt22CvmF7gViVs_9vCWuHvaikMyDTF8NEg9hU-Q9p323I9az7e9U47Mtl9_5ev4tEmHLTG-uR5HZUfgaeuljUfSi6tg3NBJhL8zlZO4JPPu0LaFewchKaL-mNFVFgW7U-l7bdw8FtE5ghOtvdWqVcYQmfpA6wErutqPw-tN8szn7lDzLasOo964dX21MAzfT2ySyaMz6OKye2mqPTvJqipsEPeUjLyh9e-JB_P6clj6yIbEAzycmqdMNl6SHRapp7sxnda6sqqrqXSx8cymd2K-sbteigXxAgFFzsBzobsBK8uE-LJBgdmbMCM6baYGBJHcvYZtxWcb4YCyYCQEpuM2ViWnpIqCwGP9ilyVp3oSdeaBp9RIM1aAdj7HjqD18C-LRwdaXD8v9y7Nx819bIUyGnWaHQZQ6xEnwBXDsLey53f2FG9ZtOKwazT65WxUs94NSlMUeqcP5twIA9uX53bztcEmv2uUTmpXX3fNa4wUg1aAmzTLmx6s6QI7e6dUkUEmvOCMaKXuc4Vx1uQHhO-XKc1Lz1wx1ZfEcEKkJVtmD_Lc3K7Mt5iaBGrOGVLvZ7DnISoIYprNyf6UrUHJsxaHQkel4zIoXcKlbDuVR3SEhleC2KX4zbBz4q0ECy5AYDCZj_2wjSNS0d6fsICsyikgkZRynxxcyD00yk9Flqo_QXWACT5qHIrpqjAZba1iMLxRIRDxvZL4kEWOfFJddk9jYMBg3fjYblzh05J9LT9KFgwbsuLASQ2CuVUH28V5DUMpLJstnaLLHFpgUoWsP-466UEI-oLdIk6NpmJpEEFMyYA-NYg-YfjKCEzkhgpAafMc2XjgSny0XERPzeQlrwmAJgpDOj7bS4UD6I3NE07Zgopj1of0JUzrHh2I5GN9CSU1h4c2EcawKBHC4z73talgBStZKhUmmIhfxOP-iMGUDMdtW6PS4Je_iQadnLG4Q5Rt4YeOg94CKAzkYbQufLxTo--SlxmNe3xYLYdGsT3VkqiBrtuIcCUdn88C6XG1AUcnX0ltJVdy3M97iiGffOaAzov41PcXdcieC7wLu3QAaaJm-2osljNm_Eu7cDOR2rRxNZtYMCprvG9Hl9Vr8314BzxP6rygRI6xn_VSn0dAAhX5vjGMOKaVPsx7HmgPO3NYr3MKsxkPLsF3N9kADPY8nGkmH-J6XKlb-CwePXxi6_d3cFjlWlR1jkABW4241-6ijXXDw7dtc6DWZky8NrfagKfH6JtbZxqlrkNm9aSVLiKLc3hhWSiDtBqqknsPU-GitWajFIqNdWBfZnbUQCyK4249_ZWP420FW98kFJw6fDbJns9_Vsetn65jtLQ6p3f73I6v0G3SQZDWqK-OQo66hgIBCy0Y_tbFrn131_0cgrlEZMuY2nki21f-8cvDNAF4bAPoNJeB1B11Cf99AzLxcCyxEodHt6FEzgqiMVTj_RHcTw22qoyFBzLrzWCs91hlZankGOL1U7oWZxDGXonLnO-4b7qeojpgGJRvE3H0HchUGCvJgXvvOACpHiba3NlH4kZlyne1mmkS_uo_ah6cfedXm7jz12dBI86XJP3hL_pCgUBlMlHdY1aJ9QFaZ6mOhUVYZ8xOlF2CmtHkOouqwRxhYJ8NhUziYIXFSEYEHNLftcdLx7MsEKuF0uUhDgdXNjVrXPvZOq2-63SZZFI9BwSvMTbqQ_4oyWe7Mslhmxvg89qkp4k1SrToQAHOtYcS21WUu1e82CfgpIDXBR9HlnfD8ATpN-E1vkpenXOAf_FGCpTswNJvu3KhIid6XiCQCubvjoi-a2q89ObUbTtKQgqDj8Z42i0kSMW0B3qvPdLI42NjlmqeIkJ-rQtgC3R2hqg4N3LYkihXkl48hKMu72qk1glZG-hOE0_OKzeU3seQMGxXpSj7AA9leB2s-O0EOqs8llz90Eeghd_R0tb3xdlzIpy7KaeUFyQ9wYRfB-Nu63gZGLLb72eMI9Uq2v2eAoC8yTF8X4rGCoSGyd49xC2AT9ysQ-vY4-4k72PdkWQd6Uoe1tmOXa2lxiO1ZUrB9PwHcKrKGjVrDcZYkia45DAosAlR5plLjYR3EeAwf0F6pI7gJqkBWFQTDbNTdkPixwsGiIeCAkRhrIFaLwFCr31TzqNUB-YOF3heI5545jSjFh6Oetom6WQAipu21YLKIWKbDFe8Cq7O07JTEt8M4LU0yYPD0PDShHe3pgqxS01PPp5NijJR5k5LBkmHAERG0oPdn-MlHQRCXDmXUIkvJ_iUI77V5NPZD0R4Rba_XkecoMHXI6bWmeNxOSgXnupKv0pEwop2sLEwEaJIRM3XqP_6689__nDbsxyzVj6_mioU5gQxniT6BtURmIPMcYjU6RlXccmrm-YfQZyT368E6yo6dVvPPGRxj1rrYx_QwihQKJ0xO-H3ZyLXCcz8TAsTpny62Lo-vzViZXy7tHij1-ppuxvZQJMq0AChCHf42HVsPPDnuSZBgy8aZMlP3SOwGGTWhX9QM5D4HLCEC4mc9TtKMgdAnKvW04NKLl7dWfAteRKKBrWBJAUJnz2gR2V-F8jA5Y8_X66DFxPgTDzTOuybZvQ5Jw3KNqjK14BMyXY1JPVKWAKQZOvnupPR04lipzAApMb5U5AINtBmioPqWUvvtux4GqgKXSM4v07UISTMuH7V4e28Oc9FrcF_a_R8uf6V-VmaclOCn8oUULBOO1ZWV0cRl8Wm4hWO88-U19ZTepxb-RvrSVfbCc_v4TDkGxkRuiFC5hH8DA50VxOgmeReSS1-udMx5PtICKJDr11OEZ4WImwTSY960HLBXiu1VoJS7RU0j6OyViZY1znr-aYtJJrGHkIkNez9BSXOtSB0ilx8tTnzJWsGZX8Voa8h--4ulM3Vec_rtp_gaw2ozAPzOVWqWQXaYvQ3buqDccpCx6PNhqLZpqVI3gW_WdGjd9JFYTFfYmt9iKNct32X4DftRTN-8As9cz8-SnicSxIfIPFpQP1W00rW7_RrE8PHK4-awaU2pTbyE9KMTNDc2LS_xNw-P_BtWQnDWwt8Rjl63w2g6GarDcgrb15SPVEyEwqoZanlvYP5yfy__wMq1jHGmg0AAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6ZmFsc2V9fQ==",
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              // background: models.BackgroundType.Transparent,
              // layoutType: models.LayoutType.Custom,
              // customLayout: {
              // displayOption: models.DisplayOption.FitToPage
              // }
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
  )
}

export default Report;

const PageContainer =styled.div`
  height:400px
`