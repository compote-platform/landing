
archive:
	# 	make a structure
	mkdir ./deployment
	mkdir ./deployment/css
	mkdir ./deployment/vendor
	mkdir ./deployment/images
# 	combine
	cp -a ./css/. ./deployment/css/
	cp -a ./vendor/. ./deployment/vendor/
	cp -a ./images/. ./deployment/images/
	cp ./index.html ./deployment/index.html	
# 	archive
	tar -zcvf deployment.tar.gz ./deployment	

uploadarchive:
	rsync -avzhe ssh ./deployment.tar.gz maker@www.compote.xyz:/var/www/compote.xyz/
	rsync -avzhe ssh ./deployment.sh maker@www.compote.xyz:/var/www/compote.xyz/

cleanarchive:
	rm -rf deployment
	rm -rf deployment.tar.gz

deploy:
	make archive
	make uploadarchive
#	apply	
	ssh maker@www.compote.xyz "cd /var/www/compote.xyz;chmod +x deployment.sh;./deployment.sh"
	make cleanarchive

compressimages:
	cd images;pngquant *.png */*.png */*/*.png;cd ..;
	echo "produces copies of images with or8/fs8 postfix"
