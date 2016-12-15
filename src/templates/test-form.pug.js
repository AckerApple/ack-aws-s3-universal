export default "<div class=\"flex flex-flow-inline\"><div style=\"padding:0 1em\"><h3>AWS Access Keys</h3><div><label for=\"$ctrl.aws.accessKeyId\">accessKeyId</label><div><input ng-model=\"$ctrl.aws.accessKeyId\" id=\"$ctrl.aws.accessKeyId\"/></div><br/></div><div><label for=\"$ctrl.aws.secretAccessKey\">secretAccessKey</label><div><input ng-model=\"$ctrl.aws.secretAccessKey\" id=\"$ctrl.aws.secretAccessKey\"/></div><br/></div><div><label for=\"$ctrl.aws.region\">region</label><div><input ng-model=\"$ctrl.aws.region\" id=\"$ctrl.aws.region\"/></div><br/></div></div><div style=\"padding:0 1em\"><h3>S3 Attributes</h3><div><label for=\"$ctrl.s3.Bucket\">Bucket</label><div><input ng-model=\"$ctrl.s3.Bucket\" id=\"$ctrl.s3.Bucket\"/></div><br/></div><div><label for=\"$ctrl.s3.Key\">Key (file-name)</label><div><input ng-model=\"$ctrl.s3.Key\" id=\"$ctrl.s3.Key\" placeholder=\"S3 save path\"/></div><br/></div><div><label for=\"$ctrl.mode\">Mode</label><div class=\"form-control-static\"><input type=\"checkbox\" ng-click=\"$ctrl.mode='get'\" id=\"$ctrl.mode0\" ng-checked=\"$ctrl.mode=='get'\"/><label for=\"$ctrl.mode0\">&nbsp;get</label>&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" ng-click=\"$ctrl.mode='put'\" id=\"$ctrl.mode1\" ng-checked=\"$ctrl.mode=='put'\"/><label for=\"$ctrl.mode1\">&nbsp;put</label></div></div></div><div class=\"flex align-bottom fx-fade-up fx-stagger-200\" style=\"padding:0 1em;width:200px\" ng-show=\"$ctrl.mode=='get'\"><button type=\"button\" style=\"width:100%\" ng-click=\"$ctrl.get()\">get</button></div><div class=\"fx-fade-up fx-stagger-200\" style=\"padding:0 1em\" ng-show=\"$ctrl.mode=='put'\"><h3>Kms Params</h3><div><label for=\"$ctrl.s3.KmsParams.KeyId\">KeyId</label><div><input ng-model=\"$ctrl.s3.KmsParams.KeyId\" id=\"$ctrl.s3.KmsParams.KeyId\"/></div><br/></div><div><label for=\"$ctrl.s3.KmsParams.KeySpec\">KeySpec</label><div><input ng-model=\"$ctrl.s3.KmsParams.KeySpec\" id=\"$ctrl.s3.KmsParams.KeySpec\"/></div><br/></div></div><div class=\"fx-fade-up fx-stagger-200\" style=\"padding:0 1em\" ng-show=\"$ctrl.mode=='put'\"><h3><label for=\"$ctrl.s3.Body\">Body Payload</label></h3><div style=\"width:300px\"><textarea ng-model=\"$ctrl.s3.Body\" id=\"$ctrl.s3.Body\" style=\"height:200px;width:100%\" placeholder=\"Data that will be stored in AWS S3\"></textarea><button type=\"button\" style=\"width:100%;margin:0;display:block\" ng-click=\"$ctrl.put()\">put</button></div></div></div><div class=\"fx-fade-up fx-stagger-200\" ng-show=\"$ctrl.fetching\">Loading...</div><div class=\"fx-fade-up fx-stagger-200\" ng-if=\"$ctrl.error &amp;&amp; !$ctrl.error.closeDetails\"><div class=\"border border-assertive pad bg-danger\"><div class=\"flex-wrap flex-valign-center\"><div class=\"flex1 text-danger\">{{$ctrl.error || 'Unexpected Error Occurred'}}</div><a class=\"text-xs pad-xs underline\" ng-click=\"$ctrl.errorDetails=!$ctrl.errorDetails\">more</a><a class=\"text-xs pad-xs underline\" ng-click=\"$ctrl.error.closeDetails=true\">close</a><div class=\"fx-fade-up\" ng-if=\"$ctrl.errorDetails\"><pre>{{$ctrl.error|json}}</pre></div></div></div></div><div class=\"fx-fade-up fx-stagger-200\" ng-show=\"$ctrl.resultOfGet\"><hr/><h3>Result of get</h3><textarea style=\"height:150px;width:100%\" ng-model=\"$ctrl.resultOfGet\"></textarea></div><hr/><div><h2>Save Configuration</h2><h4>Store Config in Browser localStorage Memory</h4><p>Save yourself time, next time, and save your above configuration</p><div class=\"flex\"><button type=\"button\" style=\"flex:1 1 10em\" ng-click=\"$ctrl.saveConfig()\">save config</button><button type=\"button\" style=\"flex:1 1 10em\" ng-click=\"$ctrl.reloadConfig()\">reload saved</button><button type=\"button\" style=\"flex:1 1 10em\" ng-click=\"$ctrl.clearConfig()\">clear saved</button></div></div>"