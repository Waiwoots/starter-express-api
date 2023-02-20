
<?php



	/*Get Data From POST Http Request*/
	$datas = file_get_contents('php://input');
	/*Decode Json From LINE Data Body*/
	$deCode = json_decode($datas,true);

	file_put_contents('log.txt', file_get_contents('php://input') . PHP_EOL);//,FILE_APPEND

	$replyToken = $deCode['events'][0]['replyToken'];
	$userId = $deCode['events'][0]['source']['userId'];
	$text = $deCode['events'][0]['message']['text'];
	
	
////////////////////
    $Status = file_get_contents('AC123456.json' );

	$messages = [];
	$messages['replyToken'] = $replyToken;
	if ($text == "help"){
	  $messages['messages'][0] = getFormatTextMessage("Help : คำสั้ง1 = ON \n  คำสั้งที่2 = OFF ");
	    }
		elseif($text == "สวัสดี"){

	   $messages['messages'][0] = getFormatTextMessage("สวัสดีครับ..");
	   
		}
		elseif($text == "วันนี้"||$text == "วันที่เท่าไร "||$text == "วันที่"){
		
		$today = date("d/m/Y");
        //echo $today;

	   $messages['messages'][0] = getFormatTextMessage($today);
	   
		}
		
		///////////////////////////////////////////
		
		elseif($text == "command"){
			
	     $state = array('mode' => 1, 'fan' => 1, 'temp' => 24, 'power' => true);
	     $encodeJson2 = json_encode($state);	 
	       if ($encodeJson2 == $Status)
		       { $messages['messages'][0] = getFormatTextMessage("AC123456 อยู่สถานะ".$Status."อยู่แล้ว");
	              }
				    else
				     { 
					   file_put_contents('AC123456.json', $encodeJson2 );
	                   $messages['messages'][0] = getFormatTextMessage("OK กำลังสั่งการ mode=1 fan= 4 temp=24 power=on  ");
	    
/*		              
$url = 'http://www.doopper.com/linebot/Mqtt.php';
//$myvars = 'myvar1=' . $myvar1 . '&myvar2=' . $myvar2;

$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_GET, 1);
//curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
curl_setopt( $ch, CURLOPT_GETFIELDS,);
curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec( $ch );


		*/		 
					    }
						
		        }
				
		///////////////////////////////////////////////	
			
		 elseif($text == "command2"){
			
	     $state = array('mode' => 2, 'fan' => 3, 'temp' => 25, 'power' => true);
	     $encodeJson2 = json_encode($state);	 
	         if ($encodeJson2 == $Status)
		       { $messages['messages'][0] = getFormatTextMessage("AC123456 อยู่สถานะ".$Status."อยู่แล้ว");
	              }
				    else
				     {file_put_contents('AC123456.json', $encodeJson2 );
	                   $messages['messages'][0] = getFormatTextMessage("OK กำลังสั่งการ mode=2 fan= 3 temp=25 power=on  ");
	                    }
		        }
		
		/////////////////////////////////////////////////
		
		elseif($text == "commandoff"){
			
	
	   $state = array('power' => false);
	   $encodeJson2 = json_encode($state);	 
	
	   
	   file_put_contents('AC123456.json', $encodeJson2 );
	   $messages['messages'][0] = getFormatTextMessage("OK กำลังสั้งการ AC123456  power : Off  ");
	   
		}
		elseif($text == "StatusAC123456"){
			
	
	   
	   
	   $messages['messages'][0] = getFormatTextMessage("OK สถานะAC123456 : ".$Status);
	   
		}
		else
  
         {$messages['messages'][0] = getFormatTextMessage("ไม่เข้าใจ.คำว่า....:".$text." กรุณาพิมพ์คำว่า --> : help");
				}  
				  
				  
	$encodeJson = json_encode($messages);

	$LINEDatas['url'] = "https://api.line.me/v2/bot/message/reply";
  	$LINEDatas['token'] = "cJCAjP1zeYCba76/WBwiY0ij0bzm0P0cOQfgeTovGlTJNCRKAtqBiozfETso6Ky694a25yPWH1A9ckyNPW2PMaNdqHcg13uvwMBCEv8jBvgo3wNKxOF/DTOPFfWWzNyRkzdNXG/kdcfTDXdObWHq7AdB04t89/1O/w1cDnyilFU=";

  	$results = sentMessage($encodeJson,$LINEDatas);
	




	/*Return HTTP Request 200*/
	http_response_code(200);

	function getFormatTextMessage($text)
	{
		$datas = [];
		$datas['type'] = 'text';
		$datas['text'] = $text;

		return $datas;
	}

	function sentMessage($encodeJson,$datas)
	{
		$datasReturn = [];
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => $datas['url'],
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => $encodeJson,
		  CURLOPT_HTTPHEADER => array(
		    "authorization: Bearer ".$datas['token'],
		    "cache-control: no-cache",
		    "content-type: application/json; charset=UTF-8",
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		    $datasReturn['result'] = 'E';
		    $datasReturn['message'] = $err;
		} else {
		    if($response == "{}"){
			$datasReturn['result'] = 'S';
			$datasReturn['message'] = 'Success';
		    }else{
			$datasReturn['result'] = 'E';
			$datasReturn['message'] = $response;
		    }
		}

		return $datasReturn;
	}
?>