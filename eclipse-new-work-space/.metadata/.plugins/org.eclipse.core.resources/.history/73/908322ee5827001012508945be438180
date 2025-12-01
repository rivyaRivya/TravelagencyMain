package com.woodconnectApp.woodconnectApp.service.impl;

import java.io.IOException;

import java.util.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.woodconnectApp.woodconnectApp.dto.UserDTO;
import com.woodconnectApp.woodconnectApp.dto.WoodTypeDTO;
import com.woodconnectApp.woodconnectApp.entity.User;
import com.woodconnectApp.woodconnectApp.entity.WoodType;
import com.woodconnectApp.woodconnectApp.repository.OrderTableRepository;
import com.woodconnectApp.woodconnectApp.repository.QuotationRepository;
import com.woodconnectApp.woodconnectApp.repository.UserRepository;
import com.woodconnectApp.woodconnectApp.services.UserServices;

import org.springframework.web.multipart.MultipartFile;
@Service
public class UserServiceImpl implements UserServices {

	@Autowired
	private UserRepository userRepositiry;
	@Autowired
	private OrderTableRepository orderRepositiry;
	@Autowired
	private QuotationRepository quotationRepositiry;
	@Override
	public Integer createUser(UserDTO userData) {
		User userinfo = new User();//create new user object
		userinfo.setAddress(userData.getAddress());
		userinfo.setDistrict(userData.getDistrict());
		userinfo.setDob(userData.getDob());
		userinfo.setEmail(userData.getUsername());
		userinfo.setFirstname(userData.getFirstname());
		userinfo.setLastname(userData.getLastname());
		userinfo.setGender(userData.getGender());
		userinfo.setPhone(userData.getPhone());
		userinfo.setPassword(userData.getPassword());
		userinfo.setPin(userData.getPin());
		userinfo.setType(userData.getType());
		userRepositiry.save(userinfo);
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserDTO login(UserDTO user) {
		User userData = userRepositiry.findByEmailAndPassword(user.getUsername(),user.getPassword());
		UserDTO userDetails = new UserDTO(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
		
		if(userData == null) {
			userDetails = null;
			return userDetails;
		}
		else {
			userDetails.setId(userData.getId());
			userDetails.setType(userData.getType());;
			return userDetails;
		}
	}

	public List<UserDTO> getUser() {
		// TODO Auto-generated method stub
		return userRepositiry.findAll().stream()
		        .map(driver -> new UserDTO(driver.getId(), driver.getFirstname(),
		        		driver.getLastname(),driver.getDob(),driver.getEmail(),driver.getPhone(),
		        		driver.getGender(),driver.getAddress(),driver.getPin(),driver.getDistrict(),driver.getType(), null, null, null))
		        .collect(Collectors.toList());
	}
	@Override
	public void deleteUser(Integer id) {
		User user = userRepositiry
                .findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user Id:" + id));

		userRepositiry.delete(user);
	}
	@Override
	public void updateUser(Integer id, UserDTO userData) {
		User userinfo =userRepositiry
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user Id:" + id));
		userinfo.setAddress(userData.getAddress());
		userinfo.setDistrict(userData.getDistrict());
		userinfo.setDob(userData.getDob());
		userinfo.setFirstname(userData.getFirstname());
		userinfo.setLastname(userData.getLastname());
		userinfo.setGender(userData.getGender());
		userinfo.setPhone(userData.getPhone());
		userinfo.setPin(userData.getPin());
		userRepositiry.save(userinfo);
	}
	@Override
	public UserDTO getUserDetail(Integer id) {
		User userData = userRepositiry
	                .findById(id)
	                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user Id:" + id));
		UserDTO userinfo = new UserDTO(id, null, null, null, null, null, null, null, null, null, null, null, null, null);
		userinfo.setAddress(userData.getAddress());
		userinfo.setDistrict(userData.getDistrict());
		userinfo.setDob(userData.getDob());
		userinfo.setUsername(userData.getEmail());
		userinfo.setFirstname(userData.getFirstname());
		userinfo.setLastname(userData.getLastname());
		userinfo.setGender(userData.getGender());
		userinfo.setPhone(userData.getPhone());
		userinfo.setPin(userData.getPin());
		userinfo.setType(userData.getType());    
//		userinfo.setFile(userData.getFileContent());
		// Convert Blob to Base64
	    if (userData.getFileContent() != null) {
	        byte[] fileBytes = userData.getFileContent();
	        String base64File = Base64.getEncoder().encodeToString(fileBytes);
	        userinfo.setFile(base64File);
	        userinfo.setFileName(userData.getFileName());
	    } else {
	        userinfo.setFile(null); // No file content
	    }
		return userinfo;
	}

	 public long getTotalCustomerCount() {
	        return userRepositiry.countOrdersWithCustomer();
	    }
	 
	 public long getDeliveredOrderCount() {
	        return orderRepositiry.countOrdersWithDeliveredStatus();
	    }
	 public long getOrderCount() {
	        return orderRepositiry.count();
	    }
	 public long getQuotationCount() {
	        return quotationRepositiry.count();
	    }

	public List<UserDTO> getAvailableDriver() {
//		return null;
		// TODO Auto-generated method stub
		List<User> user = orderRepositiry.findDriversNotInDeliveredBookings();
		List<UserDTO> userDetails = new ArrayList<>();
    	for (User userData : user) {
    		System.out.print(userData);
    		UserDTO userObject = new UserDTO(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    		userObject.setAddress(userData.getAddress());
    		userObject.setFirstname(userData.getFirstname());
    		userDetails.add(userObject);
    	}
		return userDetails;
	}

	public void createUser(String firstname, String lastname, String address, String email, String dob,
			String phone, String gender, String pin, String district, String type, String password,MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		User userinfo = new User();//create new user object
		userinfo.setAddress(address);
		if(district != null)
		userinfo.setDistrict(district);
		if(dob != null)
		userinfo.setDob(dob);
		userinfo.setEmail(email);
		userinfo.setFirstname(firstname);
		userinfo.setLastname(lastname);
		if(gender != null)
		userinfo.setGender(gender);
		userinfo.setPhone(phone);
		userinfo.setPassword(password);
		userinfo.setPin(pin);
		userinfo.setType(type);
		if(file != null) {
	    userinfo.setFileName(file.getOriginalFilename());
	    userinfo.setFileContent(file.getBytes()); // Save the file as byte array
		}
		userRepositiry.save(userinfo);
	}
}
