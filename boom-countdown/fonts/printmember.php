<?php 
    include "listquestion.php";
?>
 <aside class="right-side">                
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1>
                        ข้อมูลการสมัคร
                        <small>Information User</small>
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Member</li>
                    </ol>
                </section>

                <!-- Main content -->
                <section class="content">
                    <?php
                        $query = $this->db->join('ywc12_answer', 'ywc12_answer.id = ywc12_register.id', 'LEFT')
                                            ->where('ywc12_register.id', $id)
                                            ->get('ywc12_register');
                        $fetch = $query->result();
                        foreach($fetch as $f) {
                            //var_dump($f);
                            $info = json_decode($f->info);
                            $contact = json_decode($f->contact);
                            $interview = json_decode($f->interview);
                            $other = json_decode(str_replace("\\","\\\\",preg_replace("/\r\n|\r|\n|/", "",$f->other)));
                            echo '<div style="position:absolute;right:0;padding-right:20px;"><img height=150 src="http://www.ywc.in.th/ywc12/site/uploads/avatars/'.$f->avatar.'"></div>';
                            echo "<b>ชื่อ:</b> ".$f->title.$f->firstname." ".$f->lastname."<br>";
                            echo "<b>ชื่อเล่น:</b> ".$f->nickname."<br>";
                            echo "<b>สาขาที่สมัคร:</b> Web ".$f->major."<br>";
                            echo "<b>เพศ:</b> ".$f->gender."<br>";
                            echo "<b>วันเกิด:</b> ".$info->birthdate."<br>";
                            echo "<b>สถานศึกษา/มหาวิทยาลัย: </b> ".$f->university."<br>";
                            echo "<b>คณะ:</b> ".$info->faculty."<br>";
                            echo "<b>สาขา:</b> ".$info->major."<br>";
                            echo "<b>ระดับชั้น:</b> ".$f->class."<br>";
                            echo "<b>ศาสนา:</b> ".$info->religion."<br>";

                            echo "<hr/>";
                            echo "<b>เบอร์โทรศัพท์ที่สามารถติดต่อได้:</b> ".$contact->tel."<br>";
                            echo "<b>เบอร์โทรศัพท์กรณีฉุกเฉิน(ผู้ปกครอง):</b> ".$contact->telemer."<br>";
                            echo "<b>อาศัยอยู่จังหวัด:</b> ".$contact->province."<br>";
                            echo "<b>E-mail:</b> ".$f->email."<br>";
                            echo "<b>เว็บไซต์/บล็อกส่วนตัว:</b> <a href='".$contact->website."' target='_blank'>".$contact->website."</a><br>";
                            echo "<b>หากผ่านเข้ารอบสัมภาษณ์ สะดวกสัมภาษณ์ผ่านช่องทางใด:</b> ".$interview->interview."<br>";
                            if($interview->interview != "walkin") {
                            echo "<b>ระบุไอดีที่ใช้ (กรณีสัมภาษณ์ผ่าน skype/hangout):</b> ".$interview->id;
                            }
                            
                            echo "<hr/>";
                            echo "<b>กรุ๊ปเลือด:</b> ".$other->blood."<br>";
                            echo "<b>อาหารที่แพ้:</b> ".$other->food."<br>";
                            echo "<b>โรคประจำตัว:</b> ".$other->disease."<br>";
                            echo "<b>ยาที่แพ้:</b> ".$other->medical."<br>";
                            echo "<b>ประเภทอาหาร:</b> ";
                                    if($other->food_style == "default")
                                        echo "ทั่วไป";
                                    else if($other->food_style == "monk")
                                        echo "มังสวิรัติ";
                                    else if($other->food_style == "is")
                                        echo "อิสลาม";
                                    echo "<br>";
                            $intros = array(
                                            "brother" => "รุ่นพี่แนะนำ",
                                            "friends" => "เพื่อนแนะนำ",
                                            "fbcamp" => "Facebook ของค่าย",
                                            "twcamp" => "Twitter ของค่าย",
                                            "website" => "Website",
                                            "banner" => "Banner",
                                            "Poster" => "โปสเตอร์"
                                        );
                            echo "<b>รู้จัก YWC จากที่ใด:</b> ".$f->intro."<br>";
                            echo "<b>ความสามารถพิเศษหรือกิจกรรมที่เคยทำ:</b> ".$other->activities."<br>";
                            
                            echo "<hr/>";

                            echo '<p><b>1. '.$QuestionCenter[0].' </b></p>';
                            echo htmlspecialchars($f->ac1);
                            echo "<br><br>";
                            echo '<p><b>2. '.$QuestionCenter[1].' </b></p>';
                            echo htmlspecialchars($f->ac2);
                             echo "<br><br>";

                            $major = $f->major;
                            echo '<p><b>1. '.$QusetionMajor[$major][1].'</b></p>';
                            echo htmlspecialchars($f->am1);
                            echo "<br><br>";

                            echo '<p><b>2. '.$QusetionMajor[$major][2].'</b></p>';
                            echo htmlspecialchars($f->am2);
                            echo "<br><br>";

                            if($QusetionMajor[$major][3]) {
                            echo '<p><b>3. '.$QusetionMajor[$major][3].'</b></p>';
                            echo htmlspecialchars($f->am3);
                            echo "<br><br>";
                            }
                            if($major == "design") {
                                echo "<b>4. Portfolio: </b>";
                                echo "<a href='http://www.ywc.in.th/ywc12/site/register/downloads/".$f->files."'>[Attach File]</a>";
                            }
                            echo "<br><br><br><center><a href='../member'>[กลับไปหน้ารายชื่อ]</a></center><br><br>";

                        }
                        //echo $fetch->firstname;
                    ?>
                </section><!-- /.content -->
            </aside><!-- /.right-side -->