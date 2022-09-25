<?php
	error_reporting(0);
	session_start();
	$data = ['ok'=>false, 'code'=>null, 'message'=>null, 'result'=>[]];
	require './config/config.php';
	if (isset($_REQUEST['do'])) {
		$db = new dbmysqli;
		$db->dbConnect();
		if ($_REQUEST['do'] == 'adminlogin') {
			if (isset($_REQUEST['login']) && isset($_REQUEST['password'])) {
				$login = $_REQUEST['login'];
				$password = $_REQUEST['password'];
				$result = $db->selectWhere('admin',[
					[
						'login'=>$login,
						'cn'=>'='
					],
					[
						'admin_password'=>$password,
						'cn'=>'='
					]
				]);
				if ($result->num_rows) {
					$row = mysqli_fetch_assoc($result);
					if (mysqli_real_escape_string($db-> connectionString, $password) == $row['admin_password']) {
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = 'login successfully';
						foreach ($result as $key => $value) $data['result'][] = $value;
						$_SESSION['admin_unique_id'] = $data["result"][0]["admin_unique_id"];
						setcookie('admin_unique_id', $data["result"][0]["admin_unique_id"], time()+ 60 * 60 * 24 * 10);
					}
				}else{
					$data['code'] = 402;
					$data['message'] = "invaled authorization token";
				}
			}else{
				$data['code'] = 402;
				$data['message'] = 'login and password is requered';
			}
		}else if($_REQUEST['do'] == 'checkAdmin'){
			$admin_unique_id = $_SESSION['admin_unique_id'] ?? $_COOKIE['admin_unique_id'] ?? $_REQUEST['admin_unique_id'];
			if (isset($admin_unique_id)) {
				$result = $db->selectWhere('admin',[
					[
						'admin_unique_id'=>$admin_unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					$data['ok'] = true;
					$data['code'] = 200;
					$data['message'] = 'admin confirmed';
					$data['result'][] = mysqli_fetch_assoc($result);
				}else{
					$data['code'] = 403;
					$data['message'] = 'invaled authorization token';
					session_destroy();
					setcookie('admin_unique_id','', time() - 100);
				}
			}else{
				$data['code'] = 402;
				$data['message'] = 'admin_unique_id is requered';
			}
		}else if($_REQUEST['do'] == 'addNews'){
			if (isset($_SESSION['admin_unique_id']) || isset($_COOKIE['admin_unique_id']) || isset($_REQUEST['admin_unique_id'])) {
				$admin_unique_id = $_SESSION['admin_unique_id'] ?? $_COOKIE['admin_unique_id'] ?? $_REQUEST['admin_unique_id'];
				$result = $db->selectWhere('admin',[
					[
						'admin_unique_id'=>$admin_unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					if (isset($_REQUEST['title']) && isset($_REQUEST['description']) && isset($_FILES['img'])) {
						$allowed = array('png','jpg');
						$filename = $_FILES['img']['name'];
						$ext = pathinfo($filename, PATHINFO_EXTENSION);
						if (in_array($ext, $allowed)) {
							if (file_exists('../../uploads/' . $filename)) {
								$filename = time() . "_" . $filename;
							}
							$db->insertInto('news',[
								'title' => trim($_REQUEST['title']),
								'des' => trim($_REQUEST['description']),
								'img' => trim($filename),
							]);
							move_uploaded_file($_FILES['img']['tmp_name'], '../../uploads/' . $filename);
							$data['ok'] = true;
							$data['code'] = 200;
							$data['message'] = 'news inserted successfully';
						}else{
							$data['code'] = 407;
							$data['message'] = 'allowed file types: jpg, png';	
						}
					}else{
						$data['code'] = 402;
						$data['message'] = 'title, description and img is requered';
					}
				}else{
					$data['code'] = 403;
					$data['message'] = 'invaled authorization token';
				}
			}else{
				$data['code'] = 403;
				$data['message'] = 'authorization requered';
			}
		}else if($_REQUEST['do'] == 'deleteNews'){
			$admin_unique_id = $_SESSION['admin_unique_id'] ?? $_COOKIE['admin_unique_id'] ?? $_REQUEST['admin_unique_id'];
			if ($admin_unique_id) {
				$result = $db->selectWhere('admin',[
					[
						'admin_unique_id'=>$admin_unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					if (isset($_REQUEST['news_id'])) {
						$delNews = $db->selectWhere('news',[
							[
								'id'=>trim($_REQUEST['news_id']),
								'cn'=>'='
							],
						]);
						if ($delNews->num_rows) {
							$delete = $db->delete('news',[
								[
									'id'=>trim($_REQUEST['news_id']),
									'cn'=>'='
								],
							]);
							if ($delete) {
								unlink('../../uploads' . mysqli_fetch_assoc($delNews)['img']);
								$news = $db->selectWhere('news',[
									[
										'id'=>0,
										'cn'=>'>'
									],
								]);
								$data['ok'] = true;
								$data['code'] = 200;
								$data['message'] = "The news deleted successfully";
								foreach ($news as $key => $value) $data['result'][] = $value;
							}else{
								$data['code'] = 500;
								$data['message'] = "Set interval error";
							}
						}else{
							$data['code'] = 402;
							$data['message'] = "news_id is invaled";
						}
					}else{
						$data['code'] = 402;
						$data['message'] = "news_id is requered";
					}
				}else{
					$data['code'] = 403;
					$data['message'] = "invaled authorization token";
				}
			}else{
				$data['code'] = 403;
				$data['message'] = "invaled authorization token";
			}
		}else if($_REQUEST['do'] == "createQuiz"){
			if (isset($_SESSION['admin_unique_id']) || isset($_COOKIE['admin_unique_id']) || $_REQUEST['admin_unique_id']) {
				$admin_unique_id = $_SESSION['admin_unique_id'] ?? $_COOKIE['admin_unique_id'] ?? $_REQUEST['admin_unique_id'];
				$result = $db->selectWhere('admin',[
					[
						'admin_unique_id'=>$admin_unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					if (isset($_REQUEST['name']) && isset($_REQUEST['desc'])) {
						$db->insertInto('quiz',[
							'name' => trim($_REQUEST['name']),
							'des' => trim($_REQUEST['desc']),
						]);
						$quiz = $db->selectWhere('quiz',[
							[
								'id'=>0,
								'cn'=>'>'
							],
						]);
						foreach ($quiz as $key => $value);
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = 'Quiz created successfully';
						$data['result'][] = $value;
					}else{
						$data['code'] = 402;
						$data['message'] = 'quiz name and quiz description is requered';	
					}
				}else{
					$data['code'] = 403;
					$data['message'] = 'invaled authorization token';
				}
			}else{
				$data['code'] = 403;
				$data['message'] = 'authorization requered';
			}
		}else if($_REQUEST['do'] == "addQuestion"){
			if (isset($_SESSION['admin_unique_id']) || isset($_COOKIE['admin_unique_id']) || $_REQUEST['admin_unique_id']) {
				$admin_unique_id = $_SESSION['admin_unique_id'] ?? $_COOKIE['admin_unique_id'] ?? $_REQUEST['admin_unique_id'];
				$result = $db->selectWhere('admin',[
					[
						'admin_unique_id'=>$admin_unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					if (isset($_REQUEST['quiz_id']) && isset($_REQUEST['question']) && isset($_REQUEST['v1']) && isset($_REQUEST['v2']) && isset($_REQUEST['v3']) && isset($_REQUEST['t'])) {
						$db->insertInto('questions',[
							'quiz_id' => trim($_REQUEST['quiz_id']),
							'question' => trim($_REQUEST['question']),
							'v1' => trim($_REQUEST['v1']),
							'v2' => trim($_REQUEST['v2']),
							'v3' => trim($_REQUEST['v3']),
							't' => trim($_REQUEST['t']),
						]);
						$questions = $db->selectWhere('questions',[
							[
								'id'=>0,
								'cn'=>'>'
							],
						]);
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = 'question add successfully';
						$data['result'][] = mysqli_fetch_assoc($questions);
					}else{
						$data['code'] = 402;
						$data['message'] = 'quiz_id,question,variant1(v1),variant2(v2),variant3(v3) and correct answer(t) is requered';	
					}
				}else{
					$data['code'] = 403;
					$data['message'] = 'invaled authorization token';
				}
			}else{
				$data['code'] = 403;
				$data['message'] = 'authorization requered';
			}
		}else if($_REQUEST['do'] == 'getAllQuiz'){
			$quizs = $db->selectWhere('quiz',[
				[
					'id'=>0,
					'cn'=>'>'
				],
			],"ORDER BY id DESC");
			if ($quizs->num_rows) {
				$data['ok'] = true;
				$data['code'] = 200;
				$data['message'] = 'quiz count: ' . mysqli_num_rows($quizs);
				foreach ($quizs as $key => $value) $data['result'][] = $value;
			}else{
				$data['code'] = 403;
				$data['message'] = "Quiz not found";
			}
		}else if($_REQUEST['do'] == 'getQuestions'){
			$user_id = $_SESSION['unique_id'] ?? $_COOKIE['unique_id'] ?? $_REQUEST['unique_id'];
			if (isset($user_id)) {
				if (isset($_REQUEST['quiz_id'])) {
					$questions = $db->selectWhere('questions',[
						[
							'quiz_id'=>trim($_REQUEST['quiz_id']),
							'cn'=>'='
						],
					]);
					if ($questions->num_rows) {
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = 'Question count: ' . $questions->num_rows;
						foreach ($questions as $key => $value) $data['result'][] = $value; 
					}else{
						$data['code'] = 403;
						$data['message'] = 'Quiz is empty';
					}
				}else{
					$data['code'] = 403;				
					$data['message'] = 'quiz_id is requered';	
				}
			}else{
				$data['code'] = 403;				
				$data['message'] = 'user_id is requered';				
			}
		}else if($_REQUEST['do'] == 'answerQuery'){
			if (isset($_REQUEST['quiz_id']) && isset($_REQUEST['question_id']) && isset($_REQUEST['answer'])) {
				$user_id = $_SESSION['unique_id'] ?? $_COOKIE['unique_id'] ?? $_REQUEST['unique_id'];
				if (isset($user_id)) {
					$answer = $db->selectWhere('questions',[
						[
							'id'=>trim($_REQUEST['question_id']),
							'cn'=>'='
						],
						[
							'quiz_id'=>trim($_REQUEST['quiz_id']),
							'cn'=>'='
						],
						[
							't'=>trim($_REQUEST['answer']),
							'cn'=>'='
						],
					]);
					$answ = mysqli_num_rows($answer) <=> 0;
					$db->insertInto('answers',[
						'user_id' => trim($user_id),
						'quiz_id' => trim($_REQUEST['quiz_id']),
						'question_id' => trim($_REQUEST['question_id']),
						'answer' => $answ,
					]);
					$answerSelect = $db->selectWhere('answers',[
						[
							'id'=>0,
							'cn'=>'>'
						],
					]);
					foreach ($answerSelect as $key => $value);
					$data['ok'] = true;
					$data['code'] = 200;
					$data['message'] = 'success';
					$data['result'][] = $value;
				}else{
					$data['code'] = 402;
					$data['message'] = 'user_id is requered';	
				}
			}else{
				$data['code'] = 402;
				$data['message'] = 'quiz_id, and answer is requered';
			}
		}else if($_REQUEST['do'] == 'checkSolved'){
			$user_id = $_SESSION['unique_id'] ?? $_COOKIE['unique_id'] ?? $_REQUEST['unique_id'];
			if (isset($user_id)) {
				if (isset($_REQUEST['quiz_id'])) {
					$result = $db->selectWhere('answers',[
						[
							'user_id'=>trim($user_id),
							'cn'=>'='
						],
						[
							'quiz_id'=>trim($_REQUEST['quiz_id']),
							'cn'=>'='
						],
					]);
					$questions = $db->selectWhere('questions',[
						[
							'quiz_id'=>trim($_REQUEST['quiz_id']),
							'cn'=>'='
						],
					]);
					if ($result->num_rows) {
						$answers = $result->num_rows;
						$correctAnswers = 0;
						foreach ($result as $key => $value) {
							if (boolval($value['answer'])) {
								$correctAnswers++;
							}
							$data['result'][] = $value;
						}
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = "Your result:\nCorrect answers: " . $correctAnswers . "\nIn correct answers: " . ($result->num_rows - $correctAnswers) . "\nNo answers: " . ($questions->num_rows - $result->num_rows);
						$data['result']['correctAnswers'] = $correctAnswers;
						$data['result']['inCorrectAnswers'] = $result->num_rows - $correctAnswers;
						$data['result']['noAnswers'] = $questions->num_rows - $result->num_rows;
					}else{
						$data['code'] = 403;
						$data['message'] = 'Your did not run the test';
					}
				}else{
					$data['code'] = 402;
					$data['message'] = "quiz_id is requered";
				}
			}else{
				$data['code'] = 402;
				$data['message'] = "user_id is requered";
			}
		}else if($_REQUEST['do'] == 'getSolvedRating'){
			if (isset($_REQUEST['quiz_id'])) {
				$result = $db->selectWhere('answers',[
					[
						'id'=>0,
						'cn'=>'>'
					],
					[
						'quiz_id'=>trim($_REQUEST['quiz_id']),
						'cn'=>'='
					]
				]);
				if ($result->num_rows) {
					$rating = array();
					foreach ($result as $key => $value) {
						if (!isset($rating[$value["user_id"]]["correctAnswers"])) {
							$rating[$value["user_id"]]["correctAnswers"] = 0;
						}
						if (!isset($rating[$value["user_id"]]["inCorrectAnswers"])) {
							$rating[$value["user_id"]]["inCorrectAnswers"] = 0;
						}
						if (boolval($value['answer'])) {
							$rating[$value["user_id"]]["correctAnswers"] += 1;
						}else{
							$rating[$value["user_id"]]["inCorrectAnswers"] += 1;
						}
						$rating[$value["user_id"]]["quizCount"] = $rating[$value["user_id"]]["inCorrectAnswers"] + $rating[$value["user_id"]]["correctAnswers"];
					}
					$finalRating = array();
					foreach ($rating as $key => $value) {
						$getUsers = $db->selectWhere('users',[
							[
								'unique_id'=>trim($key),
								'cn'=>'='
							],
						]);
						if ($getUsers->num_rows) {
							$oneData = array();
							foreach ($getUsers as $keys => $val) $oneData[] = $val;
							$finalRating[] = array('user'=>$oneData,'unique_id'=>$key, 'correctAnswers'=>$value['correctAnswers'],'inCorrectAnswers'=>$value['inCorrectAnswers'], 'quizCount'=>$value['quizCount']);
						}
					}
					usort($finalRating, function ($a,$b) {
						if($a['correctAnswers'] == $b['correctAnswers']) return 0;
    					return $a['correctAnswers'] < $b['correctAnswers']?1:-1;
					});
					$data['ok'] = true;
					$data['code'] = 200;
					$data['message'] = 'Result of quiz id : ' . trim($_REQUEST['quiz_id']);
					$data['result'] = $finalRating;
				}else{
					$data['code'] = 403;
					$data['message'] = "No result of the request";
				}
			}else{
				$data['code'] = 402;
				$data['message'] = "quiz_id is requered";
			}
		}else if($_REQUEST['do'] == 'login'){
			if (isset($_REQUEST['mail']) && isset($_REQUEST['password'])) {
				$result = $db->selectWhere('users',[
					[
						'mail'=>$_REQUEST['mail'],
						'cn'=>'='
					],
					[
						'pass_word'=>$_REQUEST['password'],
						'cn'=>'='
					]
				]);
				if ($result->num_rows) {
					$row = mysqli_fetch_assoc($result);
					if (mysqli_real_escape_string($db-> connectionString, $_REQUEST['password']) == $row['pass_word']) {
						$data['ok'] = true;
						$data['code'] = 200;
						$data['message'] = 'login successfully';
						foreach ($result as $key => $value) $data['result'][] = $value;
						$_SESSION['unique_id'] = $data["result"][0]["unique_id"];
						setcookie('unique_id', $data["result"][0]["unique_id"], time()+ 60 * 60 * 24 * 10);
					}else{
						$data['ok'] = false;
						$data['code'] = 402;
						$data['message'] = 'login or password invaled';
					}
				}else{
					$data['code'] = 402;
					$data['message'] = "invaled authorization token";
					session_destroy();
					setcookie('unique_id', null, time()- 60 * 60 * 24 * 10);
				}
			}else{
				$data['code'] = 402;
				$data['message'] = "mail, password is requered";
			}
		}else if($_REQUEST['do'] == 'signup'){
			if (isset($_REQUEST['name']) && isset($_REQUEST['mail']) && isset($_REQUEST['password'])) {
				if (filter_var($_REQUEST['mail'],FILTER_VALIDATE_EMAIL)) {
					$result = $db->selectWhere('users',[
						[
							'mail'=>$_REQUEST['mail'],
							'cn'=>'='
						]
					]);
					if (!$result->num_rows) {
						$rand = rand(time(), 10000);
						$ins = $db->insertInto('users',[
							'unique_id' => $rand,
							'name' => trim($_REQUEST['name']),
							'mail' => trim($_REQUEST['mail']),
							'pass_word' => trim($_REQUEST['password']),
						]);
						if ($ins) {
							if (isset($_REQUEST['remember'])) {
								if ($_REQUEST['remember'] == 'on') {
									setcookie('unique_id', $rand, time()+86400);
								}
							}
							$_SESSION['unique_id'] = $rand;
							$result = $db->selectWhere('users',[
								[
									'unique_id'=>$rand,
									'cn'=>'='
								]
							]);
							$data['ok'] = true;
							$data['code'] = 200;
							$data['message'] = 'Registered successfully';
							$data['result'][] = mysqli_fetch_assoc($result);
						}else{
							$data['code'] = 500;
							$data['message'] = 'Set interval error';
						}
					}else{
						$data['code'] = 407;
						$data['message'] = $_REQUEST['mail'] . " the mail already exists";
					}
				}else{
					$data['code'] = 403;
					$data['message'] = $_REQUEST['mail'] . " the mail is invaled";
				}
			}else{
				$data['code'] = 402;
				$data['message'] = "name,mail, password is requered";
			}
		}else if($_REQUEST['do'] == 'checkUser'){
			$unique_id = $_SESSION['unique_id'] ?? $_COOKIE['unique_id'] ?? $_REQUEST['unique_id'];
			if (isset($unique_id)) {
				$result = $db->selectWhere('users',[
					[
						'unique_id'=>$unique_id,
						'cn'=>'='
					],
				]);
				if ($result->num_rows) {
					$data['ok'] = true;
					$data['code'] = 200;
					$data['message'] = 'user confirmed';
					$data['result'][] = mysqli_fetch_assoc($result);
				}else{
					$data['code'] = 403;
					$data['message'] = 'invaled authorization token';
					session_destroy();
					setcookie('unique_id','', time() - 100);
				}
			}else{
				$data['code'] = 402;
				$data['message'] = 'unique_id is requered';
			}
		}else if($_REQUEST['do'] == 'getNews'){
			$result = $db->selectWhere('news',[
				[
					'id'=>0,
					'cn'=>'>'
				],
			],"ORDER BY id DESC");
			if ($result->num_rows) {
				$data['ok'] = true;
				$data['code'] = 200;
				$data['message'] = "News count: " . $result->num_rows;
				foreach ($result as $key => $value) $data['result'][] = $value;
			}
		}else if($_REQUEST['do'] == 'sendMessage'){
			if (isset($_REQUEST['name']) && isset($_REQUEST['user']) && isset($_REQUEST['phone']) && isset($_REQUEST['comment'])) {
				$text = "Target sayti Foydalanuvchidan yangi habar!\nFoydalanuvchi ma'lumoylatlari:\nIsm-familya: " . trim($_REQUEST['name']) . "\nAloqa uchun havola: " . trim($_REQUEST['user']) . "\nTelefon raqam: " . trim($_REQUEST['phone']) . "\n\nXabar matni: \n\n" . trim($_REQUEST['comment']);
				$sendMessage = $db->bot('sendMessage',[
					'chat_id'=>1316395647,
					'text'=>$text
				]);
				$data['ok'] = true;
				$data['code'] = 200;
				$data['message'] = "API replyed successfully";
				$data['result'][] = $sendMessage;
			}else{
				$data['code'] = 402;
				$data['message'] = "name, user, phone and comment is requered";
			}
		}else if ($_REQUEST['do'] == 'sendMail') {
			if (isset($_REQUEST['user'])) {
				$text = "Target sayti Foydalanuvchi yangi havola: " . trim($_REQUEST['user']);
				$sendMessage = $db->bot('sendMessage',[
					'chat_id'=>1316395647,
					'text'=>$text
				]);
				$data['ok'] = true;
				$data['code'] = 200;
				$data['message'] = "API replyed successfully";
				$data['result'][] = $sendMessage;
			}else{
				$data['code'] = 402;
				$data['message'] = "user is requered";
			}
		}
	}else{
		$data['code'] = 400;
		$data['message'] = 'method not found';
	}
	echo json_encode($data,  JSON_PRETTY_PRINT);
?>